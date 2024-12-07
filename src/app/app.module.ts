import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LiquidityEntity, LiquiditySchema } from './liquidity-account.entity';
import { ConfigModule } from '@nestjs/config';

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
        name: LiquidityEntity.name,
        schema: LiquiditySchema,
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
