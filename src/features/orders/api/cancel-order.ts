import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

export const cancelOrder = (orderId: string): Promise<void> => {
  return api.post(`/orders/${orderId}/cancel`);
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      // Invalidate orders query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
