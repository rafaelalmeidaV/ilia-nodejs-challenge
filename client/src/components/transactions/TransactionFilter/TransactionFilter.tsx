import React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSACTION_TYPE, type TransactionType } from '../../../types/transaction.types';

interface TransactionFilterProps {
  value?: TransactionType;
  onChange: (type?: TransactionType) => void;
}

export const TransactionFilter: React.FC<TransactionFilterProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(undefined)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          !value
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {t('wallet.all')}
      </button>
      <button
        onClick={() => onChange(TRANSACTION_TYPE.CREDIT)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          value === TRANSACTION_TYPE.CREDIT
            ? 'bg-success-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {t('wallet.credit')}
      </button>
      <button
        onClick={() => onChange(TRANSACTION_TYPE.DEBIT)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          value === TRANSACTION_TYPE.DEBIT
            ? 'bg-danger-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {t('wallet.debit')}
      </button>
    </div>
  );
};