# CRM Frontend

React + TypeScript + Webpack 기반의 고객 관계 관리(CRM) 시스템 프론트엔드 프로젝트입니다.

## 🚀 기술 스택

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Webpack 5.99.9
- **Bundler**: Babel
- **Linting**: ESLint + Prettier
- **Package Manager**: npm

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트들
│   ├── common/         # 공통 컴포넌트 (Button, Input, Modal 등)
│   ├── forms/          # 폼 관련 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Sidebar, Footer 등)
│   └── ui/             # UI 컴포넌트 (Card, Table, Chart 등)
├── pages/              # 페이지 컴포넌트들
│   ├── dashboard/      # 대시보드 페이지
│   ├── customers/      # 고객 관리 페이지
│   ├── leads/          # 리드 관리 페이지
│   ├── deals/          # 거래 관리 페이지
│   ├── reports/        # 리포트 페이지
│   └── settings/       # 설정 페이지
├── hooks/              # 커스텀 React 훅들
├── utils/              # 유틸리티 함수들
├── types/              # TypeScript 타입 정의
│   ├── api/           # API 관련 타입
│   ├── components/    # 컴포넌트 관련 타입
│   └── store/         # 상태 관리 관련 타입
├── services/           # API 서비스 및 외부 서비스
│   ├── api/           # API 호출 함수들
│   └── auth/          # 인증 관련 서비스
├── store/              # 상태 관리 (Redux/Zustand 등)
│   ├── slices/        # 상태 슬라이스
│   └── actions/       # 액션 정의
├── assets/             # 정적 자산들
│   ├── images/        # 이미지 파일들
│   ├── icons/         # 아이콘 파일들
│   └── styles/        # 스타일 파일들
├── constants/          # 상수 정의
├── App.tsx            # 메인 앱 컴포넌트
├── index.css          # 글로벌 스타일
└── index.tsx          # 앱 진입점
```

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 린팅 검사
npm run lint

# 린팅 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check
```

## 📝 명명 규칙

### 1. 파일 및 폴더 명명

#### 컴포넌트 파일
- **PascalCase** 사용
- 컴포넌트와 동일한 이름으로 파일명 지정
```
✅ UserProfile.tsx
✅ CustomerList.tsx
✅ DealCard.tsx
❌ userProfile.tsx
❌ customer-list.tsx
```

#### 유틸리티 파일
- **camelCase** 사용
- 기능을 명확히 표현하는 이름 사용
```
✅ dateUtils.ts
✅ formatCurrency.ts
✅ apiHelpers.ts
❌ DateUtils.ts
❌ format-currency.ts
```

#### 타입 파일
- **camelCase** 사용
- `.types.ts` 접미사 사용
```
✅ user.types.ts
✅ api.interface.ts
✅ store.types.ts
❌ UserTypes.ts
❌ api_types.ts
```

### 2. 변수 및 함수 명명

#### 변수
- **camelCase** 사용
- 의미있는 이름 사용
```typescript
✅ const userList = [];
✅ const isAuthenticated = false;
✅ const customerData = {};
❌ const user_list = [];
❌ const is_authenticated = false;
```

#### 함수
- **camelCase** 사용
- 동사로 시작하는 이름 사용
```typescript
✅ const fetchUserData = () => {};
✅ const handleSubmit = () => {};
✅ const formatCurrency = (amount: number) => {};
❌ const userData = () => {};
❌ const submit = () => {};
```

#### 상수
- **UPPER_SNAKE_CASE** 사용
```typescript
✅ const API_BASE_URL = 'https://api.example.com';
✅ const MAX_RETRY_COUNT = 3;
✅ const DEFAULT_TIMEOUT = 5000;
❌ const apiBaseUrl = 'https://api.example.com';
❌ const maxRetryCount = 3;
```

### 3. 컴포넌트 명명

#### 컴포넌트명
- **PascalCase** 사용
- 명사로 시작하는 이름 사용
```typescript
✅ const UserProfile = () => {};
✅ const CustomerList = () => {};
✅ const DealCard = () => {};
❌ const userProfile = () => {};
❌ const customer_list = () => {};
```

#### Props 인터페이스
- 컴포넌트명 + Props 패턴 사용
- React.FC 대신 일반 함수 컴포넌트 사용 권장
```typescript
interface UserProfileProps {
  userId: string;
  userName: string;
  onEdit?: () => void;
}

// ✅ 권장: 일반 함수 컴포넌트
const UserProfile = ({ userId, userName, onEdit }: UserProfileProps) => {
  // ...
};

// ❌ 비권장: React.FC 사용
const UserProfile: React.FC<UserProfileProps> = ({ userId, userName, onEdit }) => {
  // ...
};
```

#### 제네릭 컴포넌트
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// ✅ 권장: 일반 함수 컴포넌트
const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

// ❌ 비권장: React.FC는 제네릭과 함께 사용하기 복잡
```

## 📦 Import 순서 규칙

### 1. Import 그룹 순서
```typescript
// 1. React 및 관련 라이브러리
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. 외부 라이브러리 (알파벳 순)
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

// 3. 내부 절대경로 imports (우선순위 순)
// 3-1. 타입 정의 (types)
import { CustomerType } from '@/types/api/customer';
import { UserProfileProps } from '@/types/components/user';

// 3-2. 상수 (constants)
import { API_ENDPOINTS } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

// 3-3. 유틸리티 함수 (utils)
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/dateUtils';

// 3-4. 커스텀 훅 (hooks)
import { useAuth } from '@/hooks/useAuth';
import { useCustomers } from '@/hooks/useCustomers';

// 3-5. 서비스 (services)
import { customerService } from '@/services/api/customer';
import { authService } from '@/services/auth';

// 3-6. 상태 관리 (store)
import { useAppDispatch } from '@/store/hooks';
import { customerSlice } from '@/store/slices/customer';

// 3-7. 컴포넌트 (components)
import { Button } from '@/components/common/Button';
import { CustomerCard } from '@/components/customers/CustomerCard';

// 3-8. 페이지 (pages)
import { DashboardPage } from '@/pages/dashboard/Dashboard';

// 3-9. 에셋 (assets)
import logo from '@/assets/images/logo.png';
import './CustomerProfile.css';

// 4. 상대경로 imports (알파벳 순)
import './UserProfile.css';
import { UserCard } from './UserCard';
```

### 2. Import 스타일
```typescript
// ✅ 권장: 명시적 import
import { useState, useEffect } from 'react';
import { Button, Input } from '@/components/common';

// ❌ 비권장: 전체 import
import * as React from 'react';
import * as Components from '@/components/common';
```

### 3. 내부 절대경로 우선순위 근거

#### 1순위: types
- 타입 정의는 다른 모든 코드의 기반이 되므로 가장 먼저 import
- 다른 모듈에서 타입을 참조할 수 있도록 함

#### 2순위: constants
- 상수는 애플리케이션 전체에서 사용되는 값들
- 타입 다음으로 안정적이고 의존성이 적음

#### 3순위: utils
- 순수 함수들로 구성된 유틸리티
- 외부 의존성이 없고 재사용 가능한 함수들

#### 4순위: hooks
- React 훅들로 구성
- utils보다는 복잡하지만 다른 컴포넌트에 의존하지 않음

#### 5순위: services
- 외부 API 호출이나 비즈니스 로직
- 다른 모듈에 의존할 수 있지만 컴포넌트보다는 독립적

#### 6순위: store
- 상태 관리 관련 코드
- 컴포넌트와 밀접하게 연관되지만 컴포넌트보다 먼저 정의

#### 7순위: components
- 재사용 가능한 UI 컴포넌트들
- 다른 컴포넌트나 페이지에서 사용됨

#### 8순위: pages
- 페이지 레벨 컴포넌트들
- 다른 모든 모듈을 사용할 수 있음

#### 9순위: assets
- 이미지, 스타일 등 정적 자산
- 가장 마지막에 import하여 의존성 충돌 방지
```

## 🔧 절대경로 설정

프로젝트에서는 `@/` 절대경로를 사용하여 깔끔한 import 문을 작성합니다.

```typescript
// ✅ 권장: 절대경로 사용
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/dateUtils';

// ❌ 비권장: 상대경로 사용
import { Button } from '../../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
```

### 사용 가능한 절대경로
- `@/` → `src/`
- `@/components/` → `src/components/`
- `@/pages/` → `src/pages/`
- `@/hooks/` → `src/hooks/`
- `@/utils/` → `src/utils/`
- `@/types/` → `src/types/`
- `@/services/` → `src/services/`
- `@/store/` → `src/store/`
- `@/assets/` → `src/assets/`
- `@/constants/` → `src/constants/`

## 📝 커밋 메시지 규칙

### 1. 커밋 메시지 구조
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 2. Type 종류
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드 추가 또는 수정
- **chore**: 빌드 프로세스 또는 보조 도구 변경

### 3. Scope 종류
- **components**: 컴포넌트 관련
- **pages**: 페이지 관련
- **hooks**: 커스텀 훅 관련
- **utils**: 유틸리티 함수 관련
- **types**: 타입 정의 관련
- **services**: API 서비스 관련
- **store**: 상태 관리 관련
- **assets**: 정적 자산 관련
- **config**: 설정 파일 관련

### 4. 커밋 메시지 예시
```bash
# 새로운 기능 추가
feat(customers): 고객 목록 페이지 구현

# 버그 수정
fix(auth): 로그인 상태 유지 버그 수정

# 리팩토링
refactor(components): Button 컴포넌트 리팩토링

# 문서 수정
docs(readme): 프로젝트 구조 문서 업데이트

# 스타일 수정
style(components): 코드 포맷팅 수정

# 설정 변경
chore(config): Webpack 설정 최적화
```

### 5. 커밋 메시지 작성 규칙
- 제목은 50자 이내로 작성
- 제목 첫 글자는 소문자로 시작
- 제목 끝에 마침표 사용하지 않음
- 제목은 명령형으로 작성 (과거형 X)
- 본문은 72자마다 줄바꿈
- 본문은 무엇을, 왜를 설명

## 🧪 테스트 규칙

### 1. 테스트 파일 명명
- 테스트 대상 파일과 동일한 디렉토리에 위치
- `.test.ts` 접미사 사용
```
✅ UserProfile.test.tsx
✅ dateUtils.test.ts
✅ api.test.ts
❌ UserProfileTest.tsx
❌ test-dateUtils.ts
```

### 2. 테스트 구조
```typescript
describe('ComponentName', () => {
  describe('when condition', () => {
    it('should expected behavior', () => {
      // 테스트 코드
    });
  });
});
```

## 📚 추가 리소스

- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Webpack 공식 문서](https://webpack.js.org/)
- [ESLint 규칙 가이드](https://eslint.org/docs/rules/)

## 🤝 기여 가이드

1. 이슈를 생성하여 작업 내용을 명시
2. 새로운 브랜치를 생성하여 작업
3. 커밋 메시지 규칙을 준수
4. 코드 리뷰를 받은 후 머지

## 📄 라이선스

이 프로젝트는 ISC 라이선스 하에 배포됩니다. 