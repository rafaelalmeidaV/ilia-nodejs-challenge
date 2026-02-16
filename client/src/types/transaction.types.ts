export type TransactionType = 'CREDIT' | 'DEBIT';

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: TransactionType;
}

export interface CreateTransactionRequest {
  user_id: string;
  amount: number;
  type: TransactionType;
}

export interface Balance {
  amount: number;
}