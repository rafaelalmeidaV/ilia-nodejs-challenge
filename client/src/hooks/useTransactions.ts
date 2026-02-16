import { useState, useEffect, useCallback } from 'react';
import { type Transaction, type TransactionType } from '../types/transaction.types';
import { transactionsApi } from '../api/transactions.api';
import { AxiosError } from 'axios';
import { t } from 'i18next';

export const useTransactions = (filter?: TransactionType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await transactionsApi.getTransactions(filter);
      setTransactions(data);
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            setError(err.response?.data?.message ?? t('errors.failedToFetchTransactions'));
        } else {
            setError(t('errors.failedToFetchTransactions'));
        }
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchTransactions,
  };
};