import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RechargeTaskEntity, RechargeTaskSchema } from './recharge-task.entity';
import { ConfigModule } from '@nestjs/config';
import {
  TransactionEntity,
  TransactionSchema,
} from '../models/Transaction.model';

import { ScheduleModule } from '@nestjs/schedule';

const dynamicDependencies = [];

if (process.env.DISABLE_CRONS != 'true') {
  dynamicDependencies.push(ScheduleModule.forRoot());
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([
      {
        name: RechargeTaskEntity.name,
        schema: RechargeTaskSchema,
      },
      {
        name: TransactionEntity.name,
        schema: TransactionSchema,
      },
    ]),
    ...dynamicDependencies,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
