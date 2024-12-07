import { Body, Controller, Get, ParseBoolPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Hex, isAddress } from 'viem';


type InputAddLiquidity  = {
  userAddress: string;
  walletAddress: string;
  amount: string;
  tokenAddress : string;
  userSignature: string;
  chainId: number
}

type GetAll  = {
  userAddress: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('/add-liqudity')
  async addLiquidity(
    @Body() form: InputAddLiquidity
  ) {
    if(!isAddress(form.userAddress) || !isAddress(form.walletAddress) || !isAddress(form.tokenAddress)){
      throw new Error('Invalid address');
    }
  return this.appService.saveLiquidity(form);
  }

  @Get('/get-liquidity')
  async getLiquidity(
    @Query('userAddress') userAddress: string
  ) {
    if(!isAddress(userAddress)){
      throw new Error('Invalid address');
    }
    return this.appService.getLiquidity({userAddress});
  }

  @Get('/all-liquidity')
  async getAllLiquidity() {
    return this.appService.getAllLiquidity();
  }

}
