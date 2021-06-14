import * as fs from 'fs';
const CUSTOMERS_DATA = 'src/db/mockCustomers.json';
const MERCHANTS_DATA = 'src/db/mockMerchants.json';
import { Customer } from 'src/types/customer';
import { Merchant } from 'src/types/merchant';
import { map, omit } from 'lodash';

class DB {
  getCustomers(): Customer[] {
    return JSON.parse(fs.readFileSync(CUSTOMERS_DATA, 'utf-8'));
  }
  getCustomer(id: string): Customer {
    return this.getCustomers().find((customer) => customer.id === id);
  }
  getMerchants(): Merchant[] {
    return this.cleanCriticalData(
      JSON.parse(fs.readFileSync(MERCHANTS_DATA, 'utf-8')),
    );
  }
  getMerchant(id: string): Merchant {
    return this.getMerchants().find((merchant) => merchant.id === id);
  }
  // in updates we write back the data into json file
  updateCustomers(customers) {
    fs.writeFileSync(CUSTOMERS_DATA, JSON.stringify(customers));
  }
  updateMerchants(merchants) {
    fs.writeFileSync(MERCHANTS_DATA, JSON.stringify(merchants));
  }
  // this takes merchants array and removed the infor which we dont wanna expose
  private cleanCriticalData(merchants) {
    return map(merchants, (merchant) => {
      return {
        ...merchant,
        transactions: map(merchant.transactions, (transaction) => {
          return omit(transaction, ['ccLastFour', 'ccExpiry', 'ccToken']);
        }),
      };
    });
  }
}

export default new DB();
