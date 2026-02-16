import React from 'react';
import { LoginForm } from '../../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};