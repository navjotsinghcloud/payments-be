import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersService } from './api/customers/customers.service';
import { MerchantsService } from './api/merchants/merchants.service';
import { MerchantsController } from './api/merchants/merchants.controller';
import { CustomersController } from './api/customers/customers.controller';

@Module({
  imports: [],
  controllers: [AppController, MerchantsController, CustomersController],
  providers: [AppService, CustomersService, MerchantsService],
})
export class AppModule {}
