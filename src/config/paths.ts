export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '',
      getHref: () => '/',
    },
    shop: {
      path: 'shop',
      getHref: () => '/shop',
    },
    productDetail: {
      path: 'product-detail',
      getHref: () => '/product-detail',
    },
    profile: {
      path: 'profile',
      getHref: () => '/profile',
    },
    cart: {
      path: 'cart',
      getHref: () => '/cart',
    },
    admin: {
      path: 'admin',
      getHref: () => '/admin',
    },
    checkout: {
      path: 'checkout',
      getHref: () => '/checkout',
    },
    orderHistory: {
      path: 'order-history',
      getHref: () => '/order-history',
    },
  },
} as const;
