import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LiquidityDocument, LiquidityEntity } from './liquidity-account.entity';
import { Model } from 'mongoose';
import { DefiIntent } from './app.controller';
import { DefiIntentDocument, DefiIntentEntity } from './defi-intent.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LiquidityEntity.name)
    private liquidityModel: Model<LiquidityDocument>,
    @InjectModel(DefiIntentEntity.name)
    private defiIntentModel: Model<DefiIntentDocument>,
  ) {}

  async saveLiquidity({
    userAddress,
    walletAddress,
    amount,
    tokenAddress,
    userSignature,
    chainId,
  }) {
    // Add type for the input
    const liquidityAccount = new this.liquidityModel({
      userAddress,
      walletAddress,
      amount,
      tokenAddress,
      userSignature,
      chainId,
    });
    return liquidityAccount.save();
  }

  async createDefiIntent({
    chainId,
    protocolAddress,
    liquidityAmount,
    liquidityToken,
  }: DefiIntent) {
    const defiIntent = new this.defiIntentModel({
      chainId,
      protocolAddress,
      liquidityAmount,
      liquidityToken,
      isProcessed: false,
    });
    return defiIntent.save();
  }

  async getDefiIntents() {
    const defiIntents = await this.defiIntentModel
      .where({
        isProcessed: false,
      })
      .exec();
    return defiIntents;
  }

  async processDefiIntent(defiIntentId: string) {
    const defiIntent = await this.defiIntentModel.findById(defiIntentId).exec();
    if (!defiIntent) {
      throw new NotFoundException(
        `Defi intent not found with id ${defiIntentId}`,
      );
    }
    defiIntent.isProcessed = true;
    return defiIntent.save();
  }

  async getLiquidity({ userAddress }) {
    // Get liquidity by user address
    const liquidityAccounts = await this.liquidityModel
      .find({
        userAddress: userAddress,
      })
      .exec();

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
