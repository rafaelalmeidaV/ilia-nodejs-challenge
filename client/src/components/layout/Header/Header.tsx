import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">Wallet App</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {i18n.language === 'en' ? 'PT' : 'EN'}
            </button>
            
            {user && (
              <>
                <span className="text-sm text-gray-700">
                  {user.first_name} {user.last_name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-danger-600 hover:text-danger-700 font-medium"
                >
                  {t('auth.logout')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};