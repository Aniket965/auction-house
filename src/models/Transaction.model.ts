import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TransactionStatus } from '../types';
import { Hex } from 'viem';

@Schema({
  collection: 'transactions',
})
export class TransactionEntity {
  @Prop()
  blockHash: string;

  @Prop()
  hash: string;

  @Prop()
  from: string;

  @Prop()
  input: Hex;

  @Prop()
  to: string;

  @Prop()
  transactionIndex: number;

  @Prop()
  blockNumber: number;

  @Prop()
  chainId: number;

  @Prop()
  gas: number;

  @Prop()
  gasPrice: string;

  @Prop()
  maxFeePerGas: string;

  @Prop()
  maxPriorityFeePerGas: string;

  @Prop()
  nonce: number;

  @Prop()
  type: number;

  @Prop()
  value: string;

  @Prop()
  timestamp: number;

  @Prop()
  status: TransactionStatus;

  @Prop()
  relayId: string;
}

export type TransactionDocument = TransactionEntity & Document;

export const TransactionSchema =
  SchemaFactory.createForClass(TransactionEntity);
