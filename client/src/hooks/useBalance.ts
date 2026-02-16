import { useState, useEffect } from 'react';
import { type Balance } from '../types/transaction.types';
import { transactionsApi } from '../api/transactions.api';

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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch balance');
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