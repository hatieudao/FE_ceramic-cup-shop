import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import ShopList from '@/features/shopping/components/shop-list';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const ShopRoute = () => {
  return (
    <ContentLayout title="Shop">
      <ShopList />
    </ContentLayout>
  );
};

export default ShopRoute;
