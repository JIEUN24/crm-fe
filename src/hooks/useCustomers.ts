import { useState, useEffect, useCallback } from 'react';
import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from '@/types/customers.types';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '@/api/customers';

// 고객 목록 관리 훅 (s 붙은 복수형 네이밍)
export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 고객 목록 조회
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      setError('고객 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 고객 생성
  const addCustomer = useCallback(
    async (customerData: CreateCustomerRequest) => {
      try {
        const res = await createCustomer(customerData);
        setCustomers((prev) => [...prev, res.data]);
        return res.data;
      } catch (err) {
        throw new Error('고객 생성에 실패했습니다.');
      }
    },
    []
  );

  // 고객 삭제
  const removeCustomer = useCallback(async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (err) {
      throw new Error('고객 삭제에 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    removeCustomer,
  };
};

// 단일 고객 관리 훅 (s 없는 단수형 네이밍)
export const useCustomer = (id?: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 특정 고객 조회
  const fetchCustomer = async (customerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCustomerById(customerId);
      setCustomer(res.data);
    } catch (err) {
      setError('고객 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 고객 정보 수정
  const updateCustomerData = async (
    customerId: string,
    customerData: UpdateCustomerRequest
  ) => {
    try {
      const res = await updateCustomer(customerId, customerData);
      setCustomer(res.data);
      return res.data;
    } catch (err) {
      throw new Error('고객 정보 수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }
  }, [id]);

  return {
    customer,
    loading,
    error,
    fetchCustomer,
    updateCustomer: updateCustomerData,
  };
};
