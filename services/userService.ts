import apiClient from './api';
import { ApiResponse } from '../types';

export interface User {
  id: number;
  fullname: string;
  email?: string;
  phone?: string;
  avatar?: string | null;
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/user');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export default { getCurrentUser };
