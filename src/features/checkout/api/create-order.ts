import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; // Import schema
import { MutationConfig } from '@/lib/react-query';

import { AddressFormValues } from '../types/order-adress';

export const createOrder = ({ data }: { data: AddressFormValues }) => {
  return api.post('/orders/submit', data);
};

type UseCreateOrderOptions = {
  mutationConfig?: MutationConfig<typeof createOrder>;
  onSuccessCallback?: () => void; // Callback to open success modal
};

export const useCreateOrder = ({
  mutationConfig,
  onSuccessCallback,
}: UseCreateOrderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      onSuccess?.(...args);
      onSuccessCallback?.();
    },
    ...restConfig,
  });
};
