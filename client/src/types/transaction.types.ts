export const TRANSACTION_TYPE = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
} as const;

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];

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