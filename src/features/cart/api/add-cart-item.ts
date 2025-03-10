import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { z } from 'zod';

import { handleUnauthorized } from '@/utils/handle-unauthorized';

import { api } from '../../../lib/api-client';
import { MutationConfig } from '../../../lib/react-query';
import { Cart } from '../types/cart-item';

import { CART_QUERY_KEY } from './get-cart';

export const addToCartInputSchema = z.object({
  productTypeId: z.string().min(1, 'Product type ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
});
export type AddToCartInput = z.infer<typeof addToCartInputSchema>;

type UseAddToCartOptions = {
  mutationConfig?: MutationConfig<typeof addToCart>;
};
export const addToCart = async ({ data }: { data: AddToCartInput }) => {
  try {
    const response: AxiosResponse<Cart> = await api.post('/carts/items', data);
    return response.data; // ✅ Extract only the Cart object
  } catch (error) {
    if (handleUnauthorized(error)) {
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

// Custom hook for adding items to the cart
export const useAddToCart = ({ mutationConfig }: UseAddToCartOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: addToCart, // Calls the API function
    onSuccess: (updatedCart, ...args) => {
      queryClient.setQueryData<Cart>(CART_QUERY_KEY, updatedCart); // ✅ Update cache
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }); // ✅ Refetch cart data
      onSuccess?.(updatedCart, ...args);
    },
    ...restConfig,
  });
};
