import { Controller, Get, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { Merchant } from 'src/types/merchant';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Get()
  getMerchants(): Merchant[] {
    return this.merchantsService.getMerchants();
  }

  @Get(':id')
  getMerchant(@Param() params) {
    return this.merchantsService.getMerchant(params.id);
  }

  @Get('transactions/:id')
  getMerchantTransactions(@Param() params) {
    return this.merchantsService.getMerchantTransactions(params.id);
  }
}
