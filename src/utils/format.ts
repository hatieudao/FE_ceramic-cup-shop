import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
