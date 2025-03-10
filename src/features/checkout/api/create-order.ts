import { useMutation } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';
import { handleUnauthorized } from '@/utils/handle-unauthorized';

import { api } from './../../../lib/api-client';

interface CreateOrderData {
  cartId: string;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
}

export const createOrder = async (data: CreateOrderData) => {
  try {
    const response = await api.post('/orders/submit', data);
    return response.data;
  } catch (error) {
    if (handleUnauthorized(error)) {
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

type UseCreateOrderOptions = {
  mutationConfig?: MutationConfig<typeof createOrder>;
  onSuccessCallback?: () => void; // Callback to open success modal
};

export const useCreateOrder = ({
  mutationConfig,
  onSuccessCallback,
}: UseCreateOrderOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      onSuccessCallback?.();
    },
    ...restConfig,
  });
};
