import {
  ApiResponse,
  CreateCustomerRequest,
  Customer,
  UpdateCustomerRequest,
} from '@/types/customers.types';
import axios from 'axios';

// 인스턴스랑 인터셉터 api/common으로 공통으로 쓸듯
const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer YOUR_ACCESS_TOKEN';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;

// 고객 생성 API
export const createCustomer = async (
  customerData: CreateCustomerRequest
): Promise<ApiResponse<Customer>> => {
  try {
    const res = await apiInstance.post<ApiResponse<Customer>>(
      'customers',
      customerData
    );
    return res.data;
  } catch (err) {
    console.error('고객 생성 실패:', err);
    throw err;
  }
};

// 고객 목록 조회 API
export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  try {
    const res = await apiInstance.get<ApiResponse<Customer[]>>('customers');
    return res.data;
  } catch (err) {
    console.error('고객 목록 조회 실패:', err);
    throw err;
  }
};

// 특정 고객 조회 API
export const getCustomerById = async (
  id: string
): Promise<ApiResponse<Customer>> => {
  try {
    const res = await apiInstance.get<ApiResponse<Customer>>(`customers/${id}`);
    return res.data;
  } catch (err) {
    console.error('고객 조회 실패:', err);
    throw err;
  }
};

// 고객 수정 API
export const updateCustomer = async (
  id: string,
  customerData: UpdateCustomerRequest
): Promise<ApiResponse<Customer>> => {
  try {
    const res = await apiInstance.put<ApiResponse<Customer>>(
      `customers/${id}`,
      customerData
    );
    return res.data;
  } catch (err) {
    console.error('고객 수정 실패:', err);
    throw err;
  }
};

// 고객 삭제 API
export const deleteCustomer = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const res = await apiInstance.delete<ApiResponse<null>>(`customers/${id}`);
    return res.data;
  } catch (err) {
    console.error('고객 삭제 실패:', err);
    throw err;
  }
};
