import axios, { AxiosError, type AxiosInstance } from 'axios';
import { tokenService } from '../services/token.service';

const WALLET_BASE_URL = import.meta.env.VITE_WALLET_API_URL || 'http://localhost:3001';
const USERS_BASE_URL = import.meta.env.VITE_USERS_API_URL || 'http://localhost:3002';

const createClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = tokenService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        tokenService.removeToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const walletClient = createClient(WALLET_BASE_URL);
export const usersClient = createClient(USERS_BASE_URL);