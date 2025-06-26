export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
