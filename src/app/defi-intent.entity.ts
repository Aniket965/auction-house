import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'defi-intent' })
export class DefiIntentEntity {
  @Prop() chainId: number;
  @Prop() protocolAddress: string;
  @Prop() liquidityAmount: string;
  @Prop() liquidityToken: string;
  @Prop() isProcessed: boolean;
}

export type DefiIntentDocument = DefiIntentEntity & Document;

export const DefiIntentSchema = SchemaFactory.createForClass(DefiIntentEntity);
