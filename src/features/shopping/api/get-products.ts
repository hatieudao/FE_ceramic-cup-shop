import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { Product, Meta } from '@/types/api';

import { QueryConfig } from '../../../lib/react-query';

export const getProducts = (
  page = 1,
  filters?: { name?: string; minPrice?: number; maxPrice?: number },
): Promise<{
  data: Product[];
  meta: Meta;
}> => {
  return api.get(`/products`, {
    params: {
      page,
      ...filters,
    },
  });
};
export const getProductsQueryOptions = ({
  page,
  filters,
}: {
  page?: number;
  filters?: { name?: string; minPrice?: number; maxPrice?: number };
} = {}) => {
  return queryOptions({
    queryKey: page ? ['products', { page, ...filters }] : ['products'],
    queryFn: () => getProducts(page, filters),
  });
};
type UseProductsOptions = {
  page?: number;
  filters?: { name?: string; minPrice?: number; maxPrice?: number };
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({
  page,
  filters,
  queryConfig,
}: UseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions({ page, filters }),
    ...queryConfig,
  });
};
