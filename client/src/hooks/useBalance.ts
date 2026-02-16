import { useState, useEffect } from 'react';
import { type Balance } from '../types/transaction.types';
import { transactionsApi } from '../api/transactions.api';
import { AxiosError } from 'axios';
import { t } from 'i18next';

export const useBalance = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await transactionsApi.getBalance();
      setBalance(data);
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            setError(err.response?.data?.message ?? t('errors.failedToFetchBalance'));
        } else {
            setError(t('errors.failedToFetchBalance'));
        }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    balance,
    isLoading,
    error,
    refetch: fetchBalance,
  };
};