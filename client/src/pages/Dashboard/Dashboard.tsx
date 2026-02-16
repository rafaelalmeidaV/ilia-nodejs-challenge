import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { BalanceCard } from '../../components/wallet/BalanceCard';
import { TransactionForm } from '../../components/transactions/TransactionForm';
import { TransactionList } from '../../components/transactions/TransactionList';
import { TransactionFilter } from '../../components/transactions/TransactionFilter';
import { useBalance } from '../../hooks/useBalance';
import { useTransactions } from '../../hooks/useTransactions';
import { type TransactionType } from '../../types/transaction.types';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<TransactionType | undefined>(undefined);
  
  const { balance, isLoading: balanceLoading, error: balanceError, refetch: refetchBalance } = useBalance();
  const { transactions, isLoading: transactionsLoading, error: transactionsError, refetch: refetchTransactions } = useTransactions(filter);

  const handleTransactionSuccess = () => {
    refetchBalance();
    refetchTransactions();
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BalanceCard
            balance={balance?.amount ?? null}
            isLoading={balanceLoading}
            error={balanceError}
            onRefetch={refetchBalance}
          />

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
            <TransactionFilter value={filter} onChange={setFilter} />
          </div>

          <TransactionList
            transactions={transactions}
            isLoading={transactionsLoading}
            error={transactionsError}
            onRefetch={refetchTransactions}
          />
        </div>

        <div className="lg:col-span-1">
          <TransactionForm onSuccess={handleTransactionSuccess} />
        </div>
      </div>
    </Layout>
  );
};