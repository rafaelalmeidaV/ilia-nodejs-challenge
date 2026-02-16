import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { authApi } from '../../../api/auth.api';
import { Card } from '../../common/Card';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { ErrorMessage } from '../../common/ErrorMessage';
import { isValidEmail, isValidPassword } from '../../../utils/validators';

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: any = {};

    if (!firstName) newErrors.firstName = t('errors.required');
    if (!lastName) newErrors.lastName = t('errors.required');

    if (!email) {
      newErrors.email = t('errors.required');
    } else if (!isValidEmail(email)) {
      newErrors.email = t('errors.invalidEmail');
    }

    if (!password) {
      newErrors.password = t('errors.required');
    } else if (!isValidPassword(password)) {
      newErrors.password = t('errors.invalidPassword');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      login(response);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || t('errors.registerFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('auth.register')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <ErrorMessage message={error} />}

        <Input
          label={t('auth.firstName')}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
          placeholder="John"
        />

        <Input
          label={t('auth.lastName')}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
          placeholder="Doe"
        />

        <Input
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="john.doe@example.com"
        />

        <Input
          label={t('auth.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="******"
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          {t('auth.registerButton')}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </Card>
  );
};