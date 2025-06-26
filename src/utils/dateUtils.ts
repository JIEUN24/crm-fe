export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR');
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('ko-KR');
};

export const getToday = (): Date => {
  return new Date();
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
