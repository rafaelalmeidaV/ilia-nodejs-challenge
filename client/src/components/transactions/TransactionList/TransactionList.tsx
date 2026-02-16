import React from 'react';
import { useTranslation } from 'react-i18next';
import { type Transaction } from '../../../types/transaction.types';
import { Card } from '../../common/Card';
import { Loading } from '../../common/Loading';
import { ErrorMessage } from '../../common/ErrorMessage';
import { EmptyState } from '../../common/EmptyState';
import { TransactionItem } from '../TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  onRefetch: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  error,
  onRefetch,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {t('wallet.transactions')}
      </h2>
      
      {isLoading && (
        <div className="py-8">
          <Loading text={t('common.loading')} />
        </div>
      )}
      
      {error && <ErrorMessage message={error} onRetry={onRefetch} />}
      
      {!isLoading && !error && transactions.length === 0 && (
        <EmptyState
          title={t('common.noData')}
          description="No transactions found"
        />
      )}
      
      {!isLoading && !error && transactions.length > 0 && (
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </Card>
  );
};