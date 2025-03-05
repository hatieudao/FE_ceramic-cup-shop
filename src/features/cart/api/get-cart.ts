import { queryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { QueryConfig } from '@/lib/react-query';

import { api } from '../../../lib/api-client';
import { Cart } from '../types/cart-item';
export const CART_QUERY_KEY = ['get-cart_items'];
export const getCart = async (): Promise<Cart> => {
  const response: AxiosResponse<Cart> = await api.get('/carts');
  return response.data; // ✅ Extract cart data
};
export const getCartQueryOptions = () =>
  queryOptions({
    queryKey: CART_QUERY_KEY,
    queryFn: getCart,
  });
type UseCartOptions = {
  queryConfig?: QueryConfig<typeof getCartQueryOptions>;
};

// Custom hook to fetch cart data
export const useCart = ({ queryConfig }: UseCartOptions = {}) => {
  return useQuery({
    ...getCartQueryOptions(),
    ...queryConfig, // ✅ Allows customization (e.g., refetch intervals)
  });
};
