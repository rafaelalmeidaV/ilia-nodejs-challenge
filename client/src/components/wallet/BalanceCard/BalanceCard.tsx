import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../common/Card';
import { Loading } from '../../common/Loading';
import { ErrorMessage } from '../../common/ErrorMessage';
import { formatCurrency } from '../../../utils/formatters';

interface BalanceCardProps {
  balance: number | null;
  isLoading: boolean;
  error: string | null;
  onRefetch: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  isLoading,
  error,
  onRefetch,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-gradient-to-r from-primary-500 to-primary-700 text-white">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium opacity-90">{t('wallet.totalBalance')}</h2>
        
        {isLoading && <Loading size="sm" />}
        
        {error && (
          <ErrorMessage message={error} onRetry={onRefetch} />
        )}
        
        {!isLoading && !error && balance !== null && (
          <p className="text-4xl font-bold">{formatCurrency(balance)}</p>
        )}
      </div>
    </Card>
  );
};