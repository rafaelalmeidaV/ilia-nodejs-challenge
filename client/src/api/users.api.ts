import { usersClient } from './client';
import { type UserResponse } from '../types/user.types';

export const usersApi = {
  async getUsers(): Promise<UserResponse[]> {
    const response = await usersClient.get<UserResponse[]>('/users');
    return response.data;
  },

  async getUser(id: string): Promise<UserResponse> {
    const response = await usersClient.get<UserResponse>(`/users/${id}`);
    return response.data;
  },
};