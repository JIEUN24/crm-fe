// 기본 사용자 정보
export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  created_at: string;
  last_sign_in_at: string;
}

// 클라이언트 상태 관리용
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
  refreshToken?: string;
}

// 요청 타입들
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface UpdateProfileRequest {
  name?: string;
  password?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// 기본 API 응답 구조 (제네릭)
export interface ApiResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

// 토큰 정보
export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
}

// 인증 데이터 (로그인/회원가입 응답)
export interface AuthData extends TokenData {
  user: User;
  needEmailVerification?: boolean;
}

// 토큰 재발급 데이터
export interface RefreshTokenData extends TokenData {
  token_type: string;
}

// 토큰 정보 조회 데이터
export interface TokenInfoData {
  user: User;
  expires_at: number;
  expires_in: number;
}

// 이메일 인증 데이터
export interface EmailVerificationData {
  message: string;
}

// 구체적인 응답 타입들 (위의 제네릭 사용)
export type AuthResponse = ApiResponse<AuthData>;
export type ProfileResponse = ApiResponse<User>;
export type RefreshTokenResponse = ApiResponse<RefreshTokenData>;
export type TokenInfoResponse = ApiResponse<TokenInfoData>;
export type LogoutResponse = ApiResponse<null>;
export type ResetPasswordResponse = ApiResponse<null>;
export type EmailVerificationResponse = ApiResponse<EmailVerificationData>;
