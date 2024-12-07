import { Injectable, NotFoundException } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { encodePacked, Hex, isAddress } from 'viem';
import { InjectModel } from '@nestjs/mongoose';
import {
  LiquidityDocument,
  LiquidityEntity
} from './liquidity-account.entity';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LiquidityEntity.name)
    private liquidityModel: Model<LiquidityDocument>,
  ) {}

  async saveLiquidity({
    userAddress,
    walletAddress,
    amount,
    tokenAddress,
    userSignature,
    chainId,
  }) { // Add type for the input
    const liquidityAccount = new this.liquidityModel({
      userAddress,
      walletAddress,
      amount,
      tokenAddress,
      signature: userSignature,
      chainId,
    });
    return liquidityAccount.save();
  }

  async getLiquidity({userAddress}) { // Get liquidity by user address
    const liquidityAccounts = await this.liquidityModel.find({
      userAddress: userAddress
    }).exec();

    if (!liquidityAccounts || liquidityAccounts.length === 0) {
      throw new NotFoundException(`No liquidity found for user ${userAddress}`);
    }
    return liquidityAccounts;
  }  

  async getAllLiquidity() {
    const liquidityAccounts = await this.liquidityModel.find().exec();
    return liquidityAccounts;
  }
}
