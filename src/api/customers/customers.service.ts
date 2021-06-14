import { Injectable } from '@nestjs/common';
import dbInstance from 'src/db';
import { Customer, CustomerDetails, CustomerInput } from 'src/types/customer';
import { Merchant, Transaction } from 'src/types/merchant';
import { getMaximumIndexByKey, padZeros } from 'src/helpers/serviceHelpers';
import { filter, map } from 'lodash';

@Injectable()
export class CustomersService {
  //  returns all the customers
  // appending merchant name to the customer data
  getCustomers(): CustomerDetails[] {
    return map(dbInstance.getCustomers(), (customer) => {
      if (!customer.merchantId) return customer;
      const merchant = dbInstance.getMerchant(customer.merchantId);
      return {
        ...customer,
        merchantName: merchant.name,
      };
    });
  }
  getCustomer(customerId: string): CustomerDetails {
    return dbInstance.getCustomer(customerId);
  }
  getCustomerTransactions(customerId: string): Transaction[] {
    const customer = this.getCustomer(customerId);
    return this.handleCustomerTransactions(customer.merchantId, customerId);
  }
  // first we find the maximum id of existing customers
  // then crreate new +1 index
  createCustomer(customer: CustomerInput) {
    const maxId = getMaximumIndexByKey(dbInstance.getCustomers(), 'id');
    const newId = padZeros(`${+maxId + 1}`);
    dbInstance.updateCustomers([
      ...dbInstance.getCustomers(),
      {
        ...customer,
        id: newId,
      },
    ]);
  }
  updateCustomer(customer: Customer) {
    dbInstance.updateCustomers([...dbInstance.getCustomers(), customer]);
    return customer;
  }
  deleteCustomer(customerId: string) {
    dbInstance.updateCustomers(
      filter(dbInstance.getCustomers(), (customer) => {
        return customer.id !== customerId;
      }),
    );
    return true;
  }

  // we first get details of customer's merchant then transactions of a customer
  private handleCustomerTransactions(
    merchantId: string,
    customerId: string,
  ): Transaction[] {
    const merchant = dbInstance.getMerchant(merchantId);
    return this.getTransactionsByCustomerId(
      customerId,
      merchant.transactions,
      merchant.currency,
    );
  }

  // first we filter transactions belongs to specific customer
  // then we append currency as well to the transation
  private getTransactionsByCustomerId(
    customerId: string,
    transactions: Transaction[],
    currency: string,
  ) {
    return map(
      filter(
        transactions || [],
        (transaction) => transaction.customerId === customerId,
      ),
      (transaction) => {
        return { ...transaction, currency };
      },
    );
  }
}
