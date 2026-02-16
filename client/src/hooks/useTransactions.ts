import { useState, useEffect } from 'react';
import { type Transaction, type TransactionType } from '../types/transaction.types';
import { transactionsApi } from '../api/transactions.api';

export const useTransactions = (filter?: TransactionType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await transactionsApi.getTransactions(filter);
      setTransactions(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchTransactions,
  };
};