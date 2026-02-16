import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { type TransactionType, type CreateTransactionRequest, TRANSACTION_TYPE } from '../../../types/transaction.types';
import { transactionsApi } from '../../../api/transactions.api';
import { Card } from '../../common/Card';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { ErrorMessage } from '../../common/ErrorMessage';
import { isValidAmount } from '../../../utils/validators';

interface TransactionFormProps {
  onSuccess: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TRANSACTION_TYPE.CREDIT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountInCents = Math.round(parseFloat(amount) * 100);
    
    if (!isValidAmount(amountInCents)) {
      setError(t('errors.invalidAmount'));
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data: CreateTransactionRequest = {
        user_id: user!.id,
        amount: amountInCents,
        type,
      };

      await transactionsApi.createTransaction(data);
      
      setAmount('');
      setType(TRANSACTION_TYPE.CREDIT);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || t('errors.transactionFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {t('wallet.createTransaction')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <ErrorMessage message={error} />}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('wallet.type')}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType(TRANSACTION_TYPE.CREDIT)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === TRANSACTION_TYPE.CREDIT
                  ? 'bg-success-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('wallet.credit')}
            </button>
            <button
              type="button"
              onClick={() => setType(TRANSACTION_TYPE.DEBIT)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === TRANSACTION_TYPE.DEBIT
                  ? 'bg-danger-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('wallet.debit')}
            </button>
          </div>
        </div>

        <Input
          label={t('wallet.amount')}
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          {t('common.submit')}
        </Button>
      </form>
    </Card>
  );
};