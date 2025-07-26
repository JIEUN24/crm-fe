import { register } from '@/api/auth';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store';
import * as Checkbox from '@radix-ui/react-checkbox';
import {
  EnvelopeOpenIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  GlobeIcon,
  LockClosedIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RegisterProps = {
  setShowRegister: (value: boolean) => void;
};

export const Register = ({ setShowRegister }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState<boolean | 'indeterminate'>(
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!name) {
      newErrors.name = '이름을 입력해주세요';
    } else if (name.length < 2) {
      newErrors.name = '이름은 2글자 이상이어야 합니다.';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!agreeTerms) {
      newErrors.terms = '이용약관에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await register({ name, email, password });
      const { user, access_token, refresh_token } = response.data;
      setAuth(user, access_token, refresh_token);

      // 회원가입 성공 시 대시보드로 이돌
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error: any) {
      if (error.response?.status === 409) {
        setErrors({ email: '이미 사용 중인 이메일입니다.' });
      } else if (error.response?.status === 422) {
        setErrors({ email: '입력한 정보를 확인해주세요.' });
      } else {
        setErrors({ email: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`${provider}로 회원가입`);
    // 소설 회원가입 구현
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2 className="form-title">회원가입</h2>
        <p className="form-subtitle">새 계정을 생성하여 시작하세요</p>
      </div>

      {/* 회원가입 폼 */}
      <form onSubmit={handleSubmit} className="register-form">
        {/* 이름 필드 */}
        <div className="form-group">
          <label htmlFor="name" className="label">
            이름 <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <PersonIcon width={18} height={18} />
            </span>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name)
                  setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`input ${errors.name ? 'error' : ''}`}
              placeholder="이름을 입력하세요"
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

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

        {/* 비밀번호 확인 필드 */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="label">
            비밀번호 확인 <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <LockClosedIcon width={18} height={18} />
            </span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
              }}
              className={`input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="비밀번호를 다시 입력하세요"
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeClosedIcon width={18} height={18} />
              ) : (
                <EyeOpenIcon width={18} height={18} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        {/* 이용약관 동의 */}
        <div className="form-group">
          <div className="remember-forgot">
            <div className="remember-me">
              <Checkbox.Root
                checked={agreeTerms}
                onCheckedChange={setAgreeTerms}
                className="checkbox"
                id="terms"
              >
                <Checkbox.Indicator>✓</Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="terms" className="checkbox-label">
                <span className="required">*</span>
                <a href="#" className="terms-link">
                  이용약관
                </a>{' '}
                및{' '}
                <a href="#" className="terms-link">
                  개인정보 처리방침
                </a>
                에 동의합니다
              </label>
            </div>
          </div>
          {errors.terms && <p className="error-message">{errors.terms}</p>}
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className={`login-button ${isLoading ? 'loading' : ''}`}
        >
          <span className="button-text">
            {isLoading ? '가입 중...' : '회원가입'}
          </span>
          {isLoading && <div className="spinner"></div>}
        </button>
      </form>

      {/* 구분선 */}
      <div className="divider">
        <span className="divider-text">또는</span>
      </div>

      {/* 소셜 회원가입 */}
      <div className="social-login">
        <button
          type="button"
          onClick={() => handleSocialRegister('Google')}
          className="social-button"
          disabled={isLoading}
        >
          <span className="social-icon">
            <GlobeIcon width={18} height={18} />
          </span>
          Google로 가입
        </button>
        <button
          type="button"
          onClick={() => handleSocialRegister('Kakao')}
          className="social-button kakao-button"
          disabled={isLoading}
        >
          카카오로 가입
        </button>
      </div>

      {/* 푸터 */}
      <div className="footer">
        <p className="footer-text">
          이미 계정이 있으신가요?{' '}
          <button
            onClick={() => setShowRegister(false)}
            className="signup-link"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
