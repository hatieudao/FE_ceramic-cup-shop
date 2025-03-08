import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import OrderHistory from '@/features/orders/components/order-history';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const OrderRoute = () => {
  return (
    <ContentLayout title="Order">
      <OrderHistory />
    </ContentLayout>
  );
};

export default OrderRoute;
