import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Meta } from '@/types/api';

import { Order } from '../types/order';

export const getOrders = (
  page = 1,
  filters?: { fullName?: string; email?: string },
): Promise<{ data: Order[]; meta: Meta }> => {
  return api.get(`/orders`, {
    params: {
      page,
      ...filters,
    },
  });
};
export const getOrdersQueryOptions = ({
  page,
  filters,
}: {
  page?: number;
  filters?: { fullName?: string; email?: string };
} = {}) => {
  return queryOptions({
    queryKey: page ? ['orders', { page, ...filters }] : ['orders'],
    queryFn: () => getOrders(page, filters),
  });
};
type UseOrdersOptions = {
  page?: number;
  filters?: { fullName?: string; email?: string };
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
};

export const useOrders = ({ page, filters, queryConfig }: UseOrdersOptions) => {
  return useQuery({
    ...getOrdersQueryOptions({ page, filters }),
    ...queryConfig,
  });
};
