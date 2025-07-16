import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  PersonIcon,
  BarChartIcon,
  DashboardIcon,
  EnvelopeOpenIcon,
  LockClosedIcon,
  GlobeIcon,
  ChatBubbleIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '@radix-ui/react-icons';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store';

import '@/pages/auth/Login.scss';
import { login, resetPassword } from '@/api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState<boolean | 'indeterminate'>(
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showForgotDialog, setShowForgotDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();

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
      const response = await login({ email, password });
      const { user, access_token, refresh_token } = response.data;
      setAuth(user, access_token, refresh_token);

      // 이전 페이지가 있으면 그곳으로, 없으면 대시보드로 이동
      const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrors({ email: '이메일 또는 비밀번호가 잘못되었습니다.' });
      } else if (error.response?.status === 429) {
        setErrors({
          email: '너무 많은 시도입니다. 잠시 후 다시 시도해주세요.',
        });
      } else {
        setErrors({ email: '로그인에 실패했습니다. 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider}로 로그인`);
    // 소셜 로그인 구현
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: '이메일을 입력해주세요.' });
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email);
      setShowForgotDialog(false);

      // 성공 메세지(추후에 UI 수정)
      setErrors({ email: '✅ 비밀번호 재설정 이메일이 발송되었습니다.' });
    } catch (error: any) {
      if (error.response?.status === 404) {
        setErrors({ email: '등록되지 않은 이메일입니다.' });
      } else {
        setErrors({ email: '비밀번호 재설정 요청에 실패했습니다.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 왼쪽 브랜딩 섹션 */}
        <div className="brand-section">
          <div className="logo-section">
            <div className="logo-icon">
              <PersonIcon width={24} height={24} />
            </div>
            <h1 className="brand-title">CRM 시스템</h1>
            <p className="brand-description">
              효율적인 고객 관계 관리로
              <br />
              비즈니스 성장을 가속화하세요
            </p>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">
                <DashboardIcon width={16} height={16} />
              </span>
              <span className="feature-text">실시간 대시보드</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <PersonIcon width={16} height={16} />
              </span>
              <span className="feature-text">고객 관리</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                <BarChartIcon width={16} height={16} />
              </span>
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
                <span className="input-icon">
                  <EnvelopeOpenIcon width={18} height={18} />
                </span>
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
                <span className="input-icon">
                  <LockClosedIcon width={18} height={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
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
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeClosedIcon width={18} height={18} />
                  ) : (
                    <EyeOpenIcon width={18} height={18} />
                  )}
                </button>
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
              <span className="social-icon">
                <GlobeIcon width={18} height={18} />
              </span>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Kakao')}
              className="social-button kakao-button"
              disabled={isLoading}
            >
              카카오 로그인
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
