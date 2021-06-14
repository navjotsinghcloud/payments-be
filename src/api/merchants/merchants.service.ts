import { Injectable } from '@nestjs/common';
import dbInstance from 'src/db';
import { Merchant, Transaction } from 'src/types/merchant';
import { map } from 'lodash';
@Injectable()
export class MerchantsService {
  private merchants;
  constructor() {
    this.merchants = dbInstance.getMerchants();
  }
  getMerchants(): Merchant[] {
    return this.merchants;
  }
  getMerchant(id: string): Merchant {
    return dbInstance.getMerchant(id);
  }

  //  adding the currency to merchants transactions before sending back to fe
  getMerchantTransactions(merchantId: string): Transaction[] {
    const merchant = this.getMerchant(merchantId);
    return map(merchant.transactions, (transaction) => {
      return { ...transaction, currency: merchant.currency };
    });
  }
}
