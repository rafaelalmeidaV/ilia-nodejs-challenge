export const TRANSACTION_TYPE = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
} as const;

export type TransactionType = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
}

export interface CreateTransactionRequest {
  amount: number;
  type: TransactionType;
}

export interface Balance {
  amount: number;
}