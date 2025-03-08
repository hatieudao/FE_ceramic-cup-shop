import type { Order } from './types';

// Mock data based on the provided structure
const mockOrders: Order[] = [
  {
    id: '294dea7d-c539-4140-9089-210210a0371a',
    createdAt: '2025-03-08T11:38:54.000Z',
    status: 'pending',
    deliveryAddressId: 'b1d49c1e-71de-4952-9cdb-92c31aab0aa3',
    deliveryCharge: '10.00',
    totalPrice: '106.94',
    orderNote: 'Happy to be here',
    orderItems: [
      {
        id: 'e7b505bb-3ce3-4834-95c4-3ad2e03af0b7',
        createdAt: '2025-03-08T11:38:54.000Z',
        orderId: '294dea7d-c539-4140-9089-210210a0371a',
        productTypeId: '46a3077c-f975-11ef-8624-0242ac110002',
        quantity: 1,
        price: '14.99',
        productType: {
          id: '46a3077c-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e117524-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Sunset Gradient Cup',
            description: 'A beautiful gradient cup resembling a sunset.',
            isDeleted: false,
          },
          name: 'Vintage Style',
          description: '280ml vintage-inspired ceramic cup.',
          price: '14.99',
          stock: 14,
          imageUrl:
            'https://via.placeholder.com/300/FF9900/FFFFFF?text=Sunset+Cup',
        },
      },
      {
        id: 'd6451317-7d27-41e1-94de-cbd24e31bc37',
        createdAt: '2025-03-08T11:38:54.000Z',
        orderId: '294dea7d-c539-4140-9089-210210a0371a',
        productTypeId: '46a2b1b6-f975-11ef-8624-0242ac110002',
        quantity: 2,
        price: '16.49',
        productType: {
          id: '46a2b1b6-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e116b54-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Modern Geometric Cup',
            description: 'A contemporary cup with geometric patterns.',
            isDeleted: false,
          },
          name: 'Handcrafted',
          description: '300ml artisan ceramic cup.',
          price: '16.49',
          stock: 18,
          imageUrl:
            'https://via.placeholder.com/300/3366CC/FFFFFF?text=Geometric+Cup',
        },
      },
      {
        id: 'a0c4786d-3075-4b42-af8b-7898b57381b1',
        createdAt: '2025-03-08T11:38:54.000Z',
        orderId: '294dea7d-c539-4140-9089-210210a0371a',
        productTypeId: '46a30541-f975-11ef-8624-0242ac110002',
        quantity: 1,
        price: '22.99',
        productType: {
          id: '46a30541-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e11744d-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Classic Navy Cup',
            description: 'A deep navy blue ceramic cup with a glossy finish.',
            isDeleted: false,
          },
          name: 'Luxury Edition',
          description: '400ml luxurious ceramic cup.',
          price: '22.99',
          stock: 9,
          imageUrl:
            'https://via.placeholder.com/300/000066/FFFFFF?text=Navy+Cup',
        },
      },
      {
        id: '3dcf98ee-07c7-49f8-a073-37db6650351c',
        createdAt: '2025-03-08T11:38:54.000Z',
        orderId: '294dea7d-c539-4140-9089-210210a0371a',
        productTypeId: '46a2b6bb-f975-11ef-8624-0242ac110002',
        quantity: 2,
        price: '12.99',
        productType: {
          id: '46a2b6bb-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e117069-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Pastel Pink Cup',
            description: 'A soft pastel pink ceramic cup for a cozy feel.',
            isDeleted: false,
          },
          name: 'Eco-Friendly',
          description: '250ml sustainable ceramic cup.',
          price: '12.99',
          stock: 28,
          imageUrl:
            'https://via.placeholder.com/300/FFCCCC/000000?text=Pink+Cup',
        },
      },
    ],
  },
  {
    id: 'a1b2c3d4-e5f6-4140-9089-210210a0372b',
    createdAt: '2025-03-01T09:15:30.000Z',
    status: 'completed',
    deliveryAddressId: 'b1d49c1e-71de-4952-9cdb-92c31aab0aa3',
    deliveryCharge: '10.00',
    totalPrice: '59.97',
    orderNote: null,
    orderItems: [
      {
        id: 'f8g9h0i1-j2k3-4834-95c4-3ad2e03af0b8',
        createdAt: '2025-03-01T09:15:30.000Z',
        orderId: 'a1b2c3d4-e5f6-4140-9089-210210a0372b',
        productTypeId: '46a30541-f975-11ef-8624-0242ac110002',
        quantity: 2,
        price: '22.99',
        productType: {
          id: '46a30541-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e11744d-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Classic Navy Cup',
            description: 'A deep navy blue ceramic cup with a glossy finish.',
            isDeleted: false,
          },
          name: 'Luxury Edition',
          description: '400ml luxurious ceramic cup.',
          price: '22.99',
          stock: 9,
          imageUrl:
            'https://via.placeholder.com/300/000066/FFFFFF?text=Navy+Cup',
        },
      },
      {
        id: 'l2m3n4o5-p6q7-41e1-94de-cbd24e31bc38',
        createdAt: '2025-03-01T09:15:30.000Z',
        orderId: 'a1b2c3d4-e5f6-4140-9089-210210a0372b',
        productTypeId: '46a2b6bb-f975-11ef-8624-0242ac110002',
        quantity: 1,
        price: '12.99',
        productType: {
          id: '46a2b6bb-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e117069-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Pastel Pink Cup',
            description: 'A soft pastel pink ceramic cup for a cozy feel.',
            isDeleted: false,
          },
          name: 'Eco-Friendly',
          description: '250ml sustainable ceramic cup.',
          price: '12.99',
          stock: 28,
          imageUrl:
            'https://via.placeholder.com/300/FFCCCC/000000?text=Pink+Cup',
        },
      },
    ],
  },
  {
    id: 'r8s9t0u1-v2w3-4140-9089-210210a0373c',
    createdAt: '2025-02-15T14:22:10.000Z',
    status: 'canceled',
    deliveryAddressId: 'b1d49c1e-71de-4952-9cdb-92c31aab0aa3',
    deliveryCharge: '10.00',
    totalPrice: '42.47',
    orderNote: 'Canceled due to out of stock item',
    orderItems: [
      {
        id: 'x4y5z6a7-b8c9-4834-95c4-3ad2e03af0b9',
        createdAt: '2025-02-15T14:22:10.000Z',
        orderId: 'r8s9t0u1-v2w3-4140-9089-210210a0373c',
        productTypeId: '46a2b1b6-f975-11ef-8624-0242ac110002',
        quantity: 2,
        price: '16.49',
        productType: {
          id: '46a2b1b6-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e116b54-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Modern Geometric Cup',
            description: 'A contemporary cup with geometric patterns.',
            isDeleted: false,
          },
          name: 'Handcrafted',
          description: '300ml artisan ceramic cup.',
          price: '16.49',
          stock: 18,
          imageUrl:
            'https://via.placeholder.com/300/3366CC/FFFFFF?text=Geometric+Cup',
        },
      },
    ],
  },
  {
    id: 'd0e1f2g3-h4i5-4140-9089-210210a0374d',
    createdAt: '2025-02-10T11:05:45.000Z',
    status: 'completed',
    deliveryAddressId: 'b1d49c1e-71de-4952-9cdb-92c31aab0aa3',
    deliveryCharge: '10.00',
    totalPrice: '37.98',
    orderNote: 'Please leave at the front door',
    orderItems: [
      {
        id: 'j6k7l8m9-n0p1-4834-95c4-3ad2e03af0c0',
        createdAt: '2025-02-10T11:05:45.000Z',
        orderId: 'd0e1f2g3-h4i5-4140-9089-210210a0374d',
        productTypeId: '46a3077c-f975-11ef-8624-0242ac110002',
        quantity: 2,
        price: '14.99',
        productType: {
          id: '46a3077c-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e117524-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Sunset Gradient Cup',
            description: 'A beautiful gradient cup resembling a sunset.',
            isDeleted: false,
          },
          name: 'Vintage Style',
          description: '280ml vintage-inspired ceramic cup.',
          price: '14.99',
          stock: 14,
          imageUrl:
            'https://via.placeholder.com/300/FF9900/FFFFFF?text=Sunset+Cup',
        },
      },
    ],
  },
  {
    id: 'q2r3s4t5-u6v7-4140-9089-210210a0375e',
    createdAt: '2025-01-25T16:30:20.000Z',
    status: 'pending',
    deliveryAddressId: 'b1d49c1e-71de-4952-9cdb-92c31aab0aa3',
    deliveryCharge: '10.00',
    totalPrice: '35.98',
    orderNote: null,
    orderItems: [
      {
        id: 'w8x9y0z1-a2b3-4834-95c4-3ad2e03af0c1',
        createdAt: '2025-01-25T16:30:20.000Z',
        orderId: 'q2r3s4t5-u6v7-4140-9089-210210a0375e',
        productTypeId: '46a2b6bb-f975-11ef-8624-0242ac110002',
        quantity: 2,
        price: '12.99',
        productType: {
          id: '46a2b6bb-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          product: {
            id: '3e117069-f927-11ef-8624-0242ac110002',
            createdAt: '2025-03-04T11:34:01.000Z',
            name: 'Pastel Pink Cup',
            description: 'A soft pastel pink ceramic cup for a cozy feel.',
            isDeleted: false,
          },
          name: 'Eco-Friendly',
          description: '250ml sustainable ceramic cup.',
          price: '12.99',
          stock: 28,
          imageUrl:
            'https://via.placeholder.com/300/FFCCCC/000000?text=Pink+Cup',
        },
      },
    ],
  },
];

// Simulate API call with a delay
export const fetchOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1000);
  });
};

// In a real application, you would implement actual API calls here
// Example:
/*
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch('/api/orders');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await response.json();
  return data.data; // Assuming the API returns { data: [...orders] }
};
*/
