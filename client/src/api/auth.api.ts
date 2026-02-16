import { usersClient } from './client';
import { type AuthResponse, type LoginRequest, type RegisterRequest } from '../types/auth.types';

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await usersClient.post<AuthResponse>('/auth', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await usersClient.post<AuthResponse>('/users', data);
    return response.data;
  },
};