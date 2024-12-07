import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RechargeTaskStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

@Schema({ collection: 'liquidity-model' })
export class RechargeTaskEntity {
  @Prop() srcChainId: number;

}

export type RechargeTaskDocument = RechargeTaskEntity & Document;

export const RechargeTaskSchema =
  SchemaFactory.createForClass(RechargeTaskEntity);
