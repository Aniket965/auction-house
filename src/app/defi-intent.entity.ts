import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'defi-intent' })
export class LiquidityEntity {
  @Prop() chainId: number;
  @Prop() protocolAddress: string;
  @Prop() liquidityAmount: string;
  @Prop() liquidityToken: string;
  @Prop() userSignature: string;
  @Prop() tokenAddress: string;
}

export type LiquidityDocument = LiquidityEntity & Document;

export const LiquiditySchema = SchemaFactory.createForClass(LiquidityEntity);
