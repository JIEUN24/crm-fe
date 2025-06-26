import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { ProtectedRouteProps } from '@/types/components.types';
import { useAuthStore } from '@/store';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인 후 원래 페이지로 돌아갈 수 있도록 현재 위치 저장
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
