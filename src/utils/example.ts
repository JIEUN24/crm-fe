export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};
