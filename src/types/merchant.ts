export type Merchant = {
  id: string;
  name: string;
  isTrading: boolean;
  currency: string;
  transactions: Transaction[];
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  ccLastFour: string;
  ccExpiry: string;
  ccToken: string;
  customerId: string;
  date: string;
  currency?: string;
};
