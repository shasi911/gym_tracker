import apiClient from './axios-config';

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      userId: string;
    };
    token: string;
  };
  error?: string;
}

export interface UserResponse {
  success: boolean;
  data: {
    id: string;
    userId: string;
    createdAt: string;
  };
  error?: string;
}

export const authApi = {
  async login(userId: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      userId,
      password,
    });
    return response.data;
  },

  async register(userId: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      userId,
      password,
    });
    return response.data;
  },

  async getMe(): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>('/auth/me');
    return response.data;
  },
};
