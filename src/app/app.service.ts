import { Injectable, NotFoundException } from '@nestjs/common';
import { PriceService } from '../services/price.service';
import { supportedChains } from './chains';
import BigNumber from 'bignumber.js';
import { encodePacked, Hex } from 'viem';
import { InjectModel } from '@nestjs/mongoose';
import {
  RechargeTaskDocument,
  RechargeTaskEntity,
} from './recharge-task.entity';
import { Model } from 'mongoose';
import { ChainIdToRechargeIDMap, RECHARGE_RECEIVER } from '../utils/common';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(RechargeTaskEntity.name)
    private rechargeTaskModel: Model<RechargeTaskDocument>,
    private priceService: PriceService,
  ) {}

  async getQuote(srcChainId: number, destChainId: number, amount: string) {
    const srcChain = supportedChains[srcChainId];
    const destChain = supportedChains[destChainId];

    const srcChainNativeTokenPrice =
      await this.priceService.getNativeTokenPrice(srcChainId);
    const destChainNativeTokenPrice =
      await this.priceService.getNativeTokenPrice(destChainId);
    const destChainGasPrice = await this.priceService.getGasPrice(destChainId);

    const l1GasCost = await this.priceService.getL1GasCost(destChainId);

    const feesInUsd = BigNumber(destChainGasPrice)
      .times(destChain.gasLimitForFeeCalculation)
      .plus(l1GasCost)
      .div(`1e${destChain.currency.decimals}`)
      .times(destChainNativeTokenPrice);

    const amountInUsd = BigNumber(amount)
      .div(`1e${srcChain.currency.decimals}`)
      .times(srcChainNativeTokenPrice);
    const amountOutUsd = amountInUsd.minus(feesInUsd);
    const amountOut = amountOutUsd
      .div(destChainNativeTokenPrice)
      .times(`1e${destChain.currency.decimals}`)
      .toFixed(0);

    if (BigInt(amountOut) < BigInt(0)) {
      return {
        amountOut: '0',
        feesInUsd: feesInUsd.toNumber(),
        srcToken: srcChain.currency,
        destToken: destChain.currency,
        amountInUsd: amountInUsd.toNumber(),
        amountOutUsd: 0,
      };
    }

    return {
      amountOut: amountOut,
      feesInUsd: feesInUsd.toNumber(),
      srcToken: srcChain.currency,
      destToken: destChain.currency,
      amountInUsd: amountInUsd.toNumber(),
      amountOutUsd: amountOutUsd.toNumber(),
    };
  }

  async getTxData(
    srcChainId: number,
    destChainId: number,
    amount: string,
    recipientAddress: Hex,
    minAmountOut: string,
    self: boolean = true,
  ) {
    const quote = await this.getQuote(srcChainId, destChainId, amount);
    if (BigInt(quote.amountOut) < BigInt(minAmountOut)) {
      return {
        success: false,
        message: 'Amount out is less than min amount out',
        newQuote: quote,
      };
    }

    const destinationId = ChainIdToRechargeIDMap[destChainId];
    const txData = self
      ? encodePacked(
          ['bytes1', 'bytes1'],
          [
            '0x00',
            `0x${destinationId.toString(16).padStart(2, '0').slice(-2)}`,
          ],
        )
      : encodePacked(
          ['bytes1', 'bytes1', 'address'],
          [
            '0x01',
            `0x${destinationId.toString(16).padStart(2, '0').slice(-2)}`,
            recipientAddress,
          ],
        );

    return {
      success: true,
      result: {
        chainId: srcChainId,
        tx: {
          to: RECHARGE_RECEIVER,
          value: amount,
          data: txData,
        },
      },
    };
  }

  async getRechargeTask(txHash: string, chainId: number) {
    const task = await this.rechargeTaskModel.findOne({
      $or: [
        { 'srcChainTx.txHash': txHash, srcChainId: chainId },
        {
          'destChainTx.txHash': txHash,
          destChainId: chainId,
        },
      ],
    });
    if (!task) {
      throw new NotFoundException('Recharge task not found');
    }
    return {
      ...task.toObject(),
      srcToken: supportedChains[task.srcChainId].currency,
      destToken: supportedChains[task.destChainId].currency,
    };
  }

  async getSupportedChains() {
    const allPrices =
      await this.priceService.getNativeTokenAndGasPricesForAllChains();
    const refuelLimits = await this._getRefuelLimits(allPrices);
    return Object.values(supportedChains).map((chain) => {
      const gasPrice = allPrices[chain.id].gasPrice;
      const minTxFee = BigNumber(gasPrice)
        .times(chain.gasLimitForFeeCalculation)
        .toFixed(0);
      return {
        chainId: chain.id,
        name: chain.name,
        currency: chain.currency,
        minTxFee: minTxFee,
        limits: refuelLimits[chain.id],
        priceInUsd: allPrices[chain.id].nativeTokenPrice,
      };
    });
  }

  private async _getRefuelLimits(allPrices: {
    [chainId: string]: { nativeTokenPrice: number; gasPrice: string };
  }) {
    const response = {};
    Object.keys(supportedChains).forEach((srcChainId) => {
      response[srcChainId] = {};
      Object.keys(supportedChains)
        .filter((chainId) => chainId != srcChainId)
        .forEach((destChainId) => {
          const srcChainNativeTokenPrice =
            allPrices[srcChainId].nativeTokenPrice;
          const destChainNativeTokenPrice =
            allPrices[destChainId].nativeTokenPrice;
          const srcChainDecimals =
            supportedChains[srcChainId].currency.decimals;

          const maxRefuelAmountUsd =
            supportedChains[destChainId].maxRefuelLimitInUsd;
          const maxRefuelAmount = BigNumber(maxRefuelAmountUsd)
            .div(srcChainNativeTokenPrice)
            .times(`1e${srcChainDecimals}`)
            .toFixed(0);

          const minRefuelAmount = BigNumber(
            supportedChains[destChainId].minAmountForSingleTx,
          )
            .times(destChainNativeTokenPrice)
            .div(srcChainNativeTokenPrice)
            .times(`1e${srcChainDecimals}`)
            .toFixed(0);
          response[srcChainId][destChainId] = {
            minAmount: minRefuelAmount,
            maxAmount: maxRefuelAmount,
            maxAmountUsd: maxRefuelAmountUsd,
          };
        });
    });
    return response;
  }
}
