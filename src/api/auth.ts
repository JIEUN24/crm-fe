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

// 인증이 필요한 API에만 토큰을 자동으로 추가하는 인터셉터
api.interceptors.request.use((config) => {
  // 인증이 필요한 엔드포인트들
  const authRequiredPaths = [
    '/auth/logout',
    '/auth/profile',
    '/auth/token-info',
  ];

  // 현재 요청이 인증이 필요한지 확인
  const needsAuth = authRequiredPaths.some((path) =>
    config.url?.includes(path)
  );

  if (needsAuth) {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const { state } = JSON.parse(authData);
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
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
