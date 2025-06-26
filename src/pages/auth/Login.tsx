import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 실제 로그인 로직을 구현하세요
    login({
      id: '1',
      email,
      name: '테스트 사용자',
    });

    // 이전 페이지가 있으면 그곳으로, 없으면 대시보드로 이동
    const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>CRM 시스템 로그인</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
