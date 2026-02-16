import React, { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { type User, type AuthResponse } from '../types/auth.types';
import { tokenService } from '../services/token.service';
import { storageService } from '../services/storage.service';

interface AuthProviderProps {
  children: ReactNode;
}

const USER_KEY = 'user_data';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
  const storedUser = storageService.getItem<User>(USER_KEY);
  const token = tokenService.getToken();

  return storedUser && token ? storedUser : null;
  });
  const [isLoading] = useState(true);

  const login = (data: AuthResponse) => {
    tokenService.setToken(data.access_token);
    storageService.setItem(USER_KEY, data.user);
    setUser(data.user);
  };

  const logout = () => {
    tokenService.removeToken();
    storageService.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
