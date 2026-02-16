import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type AuthResponse } from '../types/auth.types';
import { tokenService } from '../services/token.service';
import { storageService } from '../services/storage.service';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_KEY = 'user_data';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = storageService.getItem<User>(USER_KEY);
    const token = tokenService.getToken();

    if (storedUser && token) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

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