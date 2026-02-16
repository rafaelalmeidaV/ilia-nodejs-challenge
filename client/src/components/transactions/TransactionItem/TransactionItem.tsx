import React from 'react';
import { TRANSACTION_TYPE, type Transaction } from '../../../types/transaction.types';
import { formatCurrency } from '../../../utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isCredit = transaction.type === TRANSACTION_TYPE.CREDIT;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCredit ? 'bg-success-100' : 'bg-danger-100'
          }`}
        >
          {isCredit ? (
            <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-danger-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )}
        </div>
        
        <div>
          <p className="font-medium text-gray-900">
            {isCredit ? 'Credit' : 'Debit'}
          </p>
          <p className="text-sm text-gray-500">ID: {transaction.id}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p
          className={`text-lg font-semibold ${
            isCredit ? 'text-success-600' : 'text-danger-600'
          }`}
        >
          {isCredit ? '+' : '-'} {formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  );
};