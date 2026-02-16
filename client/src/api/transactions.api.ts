import { walletClient } from './client';
import {
  type Transaction,
  type CreateTransactionRequest,
  type Balance,
  type TransactionType,
} from '../types/transaction.types';

export const transactionsApi = {
  async getBalance(): Promise<Balance> {
    const response = await walletClient.get<Balance>('/balance');
    return response.data;
  },

  async getTransactions(type?: TransactionType): Promise<Transaction[]> {
    const params = type ? { type } : {};
    const response = await walletClient.get<Transaction[]>('/transactions', { params });
    return response.data;
  },

  async createTransaction(data: CreateTransactionRequest): Promise<Transaction> {
    const response = await walletClient.post<Transaction>('/transactions', data);
    return response.data;
  },
};