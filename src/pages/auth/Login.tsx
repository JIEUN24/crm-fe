import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store';

import '@/pages/auth/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState<boolean | 'indeterminate'>(
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showForgotDialog, setShowForgotDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 실제 로그인 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      login({
        id: '1',
        email,
        name: email.split('@')[0] || '사용자',
      });

      // 이전 페이지가 있으면 그곳으로, 없으면 대시보드로 이동
      const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ email: '로그인에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider}로 로그인`);
    // 소셜 로그인 구현
  };

  const handleForgotPassword = () => {
    setShowForgotDialog(false);
    console.log('비밀번호 재설정 이메일 전송');
    // 비밀번호 재설정 로직 구현
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 왼쪽 브랜딩 섹션 */}
        <div className="brand-section">
          <div className="logo-section">
            <div className="logo-icon">🏢</div>
            <h1 className="brand-title">CRM 시스템</h1>
            <p className="brand-description">
              효율적인 고객 관계 관리로
              <br />
              비즈니스 성장을 가속화하세요
            </p>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span className="feature-text">실시간 대시보드</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span className="feature-text">고객 관리</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span className="feature-text">매출 분석</span>
            </div>
          </div>
        </div>

        {/* 오른쪽 로그인 폼 섹션 */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">로그인</h2>
            <p className="form-subtitle">계정에 로그인하여 시작하세요</p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* 이메일 필드 */}
            <div className="form-group">
              <label htmlFor="email" className="label">
                이메일 <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`input ${errors.email ? 'error' : ''}`}
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* 비밀번호 필드 */}
            <div className="form-group">
              <label htmlFor="password" className="label">
                비밀번호 <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`input ${errors.password ? 'error' : ''}`}
                  placeholder="비밀번호를 입력하세요"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            {/* 기억하기 & 비밀번호 찾기 */}
            <div className="remember-forgot">
              <div className="remember-me">
                <Checkbox.Root
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="checkbox"
                  id="remember"
                >
                  <Checkbox.Indicator>✓</Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="remember" className="checkbox-label">
                  로그인 상태 유지
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotDialog(true)}
                className="forgot-password"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className={`login-button ${isLoading ? 'loading' : ''}`}
            >
              <span className="button-text">
                {isLoading ? '로그인 중...' : '로그인'}
              </span>
              {isLoading && <div className="spinner"></div>}
            </button>
          </form>

          {/* 구분선 */}
          <div className="divider">
            <span className="divider-text">또는</span>
          </div>

          {/* 소셜 로그인 */}
          <div className="social-login">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="social-button"
              disabled={isLoading}
            >
              <span className="social-icon">🌐</span>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Kakao')}
              className="social-button"
              disabled={isLoading}
            >
              <span className="social-icon">💬</span>
              Kakao
            </button>
          </div>

          {/* 푸터 */}
          <div className="footer">
            <p className="footer-text">
              계정이 없으신가요?{' '}
              <a href="#" className="signup-link">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* 비밀번호 재설정 다이얼로그 */}
      <AlertDialog.Root
        open={showForgotDialog}
        onOpenChange={setShowForgotDialog}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="dialog-overlay" />
          <AlertDialog.Content className="dialog-content">
            <AlertDialog.Title className="dialog-title">
              비밀번호 재설정
            </AlertDialog.Title>
            <AlertDialog.Description
              style={{ marginBottom: '1rem', color: '#666' }}
            >
              등록된 이메일 주소로 비밀번호 재설정 링크를 보내드립니다.
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Cancel asChild>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  취소
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={handleForgotPassword}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    background: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  재설정 링크 보내기
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Login;
