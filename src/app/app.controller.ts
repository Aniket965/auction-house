import { Controller, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Hex } from 'viem';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


}
