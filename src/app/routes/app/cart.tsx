import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { CartList } from '@/features/cart/components/cart-list';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const CartRoute = () => {
  return (
    <ContentLayout title="Cart">
      <CartList />
    </ContentLayout>
  );
};

export default CartRoute;
