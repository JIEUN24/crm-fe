import {
  AuthResponse,
  LoginCredentials,
  LogoutResponse,
  RegisterCredentials,
} from '@/types/auth.types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhose:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증이 필요한 요청에 토큰 자동 추가하는 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 회원가입
export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

// 로그인
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// 로그아웃
export const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post('/auth/logout');
  return response.data;
};
