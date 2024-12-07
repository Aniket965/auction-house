import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ collection: 'liquidity-model' })
export class LiquidityEntity {
  @Prop() chainId: number;
  @Prop() userAddress: string;
  @Prop() walletAddress: string;
  @Prop() amount: string;
  @Prop() userSingature: string;
  @Prop() tokenAddress: string
}

export type LiquidityDocument = LiquidityEntity & Document;

export const LiquiditySchema =
  SchemaFactory.createForClass(LiquidityEntity);
