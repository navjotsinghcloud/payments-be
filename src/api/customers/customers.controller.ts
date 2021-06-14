import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from 'src/types/customer';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers(): Customer[] {
    return this.customersService.getCustomers();
  }

  @Get(':id')
  getCustomer(@Param() params) {
    return this.customersService
      .getCustomers()
      .find((customer) => customer.id === params.id);
  }

  @Get('transactions/:id')
  getCustomerTransactions(@Param() params) {
    return this.customersService.getCustomerTransactions(params.id);
  }

  @Post()
  createCustomer(@Body() customer: Customer) {
    this.customersService.createCustomer(customer);
    return customer;
  }

  @Put()
  updateCustomer(@Body() customer: Customer) {
    return this.customersService.updateCustomer(customer);
  }

  @Delete()
  deleteCustomer(@Body() customer: Customer) {
    return this.customersService.deleteCustomer(customer.id);
  }
}
