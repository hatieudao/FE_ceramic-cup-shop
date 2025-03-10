import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { CART_QUERY_KEY } from './get-cart';

// API function to update item quantity in the cart
export const updateCartItemQuantity = async ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}): Promise<void> => {
  await api.patch(`/carts/items/${itemId}/quantity`, { quantity });
};
type UseUpdateCartItemQuantityOptions = {
  mutationConfig?: MutationConfig<typeof updateCartItemQuantity>;
};

export const useUpdateCartItemQuantity = ({
  mutationConfig,
}: UseUpdateCartItemQuantityOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }); // ✅ Refetch cart
    },
    ...mutationConfig,
  });
};
