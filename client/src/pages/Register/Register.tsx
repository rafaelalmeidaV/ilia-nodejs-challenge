import React from 'react';
import { RegisterForm } from '../../components/auth/RegisterForm';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
};