import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthState as AuthStateType, User } from '@/types/auth.types';

// 사용자 인증 관련 상태
interface AuthStore extends AuthStateType {
  setAuth: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        token: undefined,
        refreshToken: undefined,

        setAuth: (user, token, refreshToken) =>
          set({
            isAuthenticated: true,
            user,
            token,
            refreshToken,
          }),
        logout: () =>
          set({
            isAuthenticated: false,
            user: null,
            token: undefined,
            refreshToken: undefined,
          }),
        setToken: (token) => set({ token }),
        clearAuth: () =>
          set({
            isAuthenticated: false,
            user: null,
            token: undefined,
            refreshToken: undefined,
          }),
      }),
      {
        name: 'auth-storage',
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// 전역 앱 상태
interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'app-store',
    }
  )
);
