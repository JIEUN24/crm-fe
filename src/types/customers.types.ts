// 고객
export interface Customer {
  id: string;
  name: string;
  phone: string;
  birth_date: string;
  signup_date: string;
  maturity_date: string;
  auto_payment: boolean;
  memo: string;
}

// 고객 생성 요청
export interface CreateCustomerRequest {
  name: string;
  phone: string;
  birth_date: string;
  signup_date: string;
  maturity_date: string;
  auto_payment: boolean;
  memo: string;
}

// 고객 정보 수정 요청
export type UpdateCustomerRequest = Pick<
  Customer,
  'phone' | 'auto_payment' | 'memo'
>;

// 공통 응답 폼 (제네릭)
// 다른 도메인에서도 응답 형식은 같아서 어떻게 공통으로 쓸지 협의 필요
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// 각각의 응답 (제네릭)
export type CreateCustomerResponse = ApiResponse<Customer>;
export type GetCustomersResponse = ApiResponse<Customer[]>;
export type GetCustomerResponse = ApiResponse<Customer>;
export type DeleteCustomerResponse = ApiResponse<null>;
