import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

import { useProducts } from '../../shopping/api/get-products';
import { useOrders } from '../api/get-orders';
import { Order, OrderStatus } from '../types/order';
import { Product } from '../types/product';
import { Revenue } from '../types/revenue';

import OrdersTable from './order-table';
import ProductsTable from './products-table';
import RevenueAnalytics from './revenue-analytic';
import Sidebar from './sidebar';

// Sample data for orders
const initialOrders: Order[] = [
  {
    id: '1',
    customer: 'John Doe',
    date: '2023-05-15',
    totalPrice: 129.99,
    status: 'pending',
    orderItems: [{ id: '1', name: 'Modern Chair', price: 129.99, quantity: 1 }],
  },
  {
    id: '2',
    customer: 'Jane Smith',
    date: '2023-05-14',
    totalPrice: 259.98,
    status: 'in-progress',
    orderItems: [{ id: '2', name: 'Wooden Table', price: 259.98, quantity: 1 }],
  },
  {
    id: '3',
    customer: 'Robert Johnson',
    date: '2023-05-13',
    totalPrice: 349.95,
    status: 'completed',
    orderItems: [{ id: '3', name: 'Leather Sofa', price: 349.95, quantity: 1 }],
  },
  {
    id: '4',
    customer: 'Emily Davis',
    date: '2023-05-12',
    totalPrice: 89.99,
    status: 'cancelled',
    orderItems: [{ id: '4', name: 'Coffee Table', price: 89.99, quantity: 1 }],
  },
  {
    id: '5',
    customer: 'Michael Wilson',
    date: '2023-05-11',
    totalPrice: 199.99,
    status: 'pending',
    orderItems: [{ id: '5', name: 'Bookshelf', price: 199.99, quantity: 1 }],
  },
  {
    id: '6',
    customer: 'Sarah Brown',
    date: '2023-05-10',
    totalPrice: 149.99,
    status: 'in-progress',
    orderItems: [{ id: '6', name: 'Desk Lamp', price: 149.99, quantity: 1 }],
  },
  {
    id: '7',
    customer: 'David Miller',
    date: '2023-05-09',
    totalPrice: 299.99,
    status: 'completed',
    orderItems: [{ id: '7', name: 'Office Chair', price: 299.99, quantity: 1 }],
  },
  {
    id: '8',
    customer: 'Lisa Taylor',
    date: '2023-05-08',
    totalPrice: 179.99,
    status: 'pending',
    orderItems: [{ id: '8', name: 'Side Table', price: 179.99, quantity: 1 }],
  },
];

// Sample revenue data
const revenueData: Revenue = {
  daily: 1249.95,
  weekly: 5689.87,
  monthly: 24589.65,
  yearly: 289756.42,
  chartData: [
    { date: '2023-05-01', revenue: 1200 },
    { date: '2023-05-02', revenue: 1800 },
    { date: '2023-05-03', revenue: 1400 },
    { date: '2023-05-04', revenue: 2200 },
    { date: '2023-05-05', revenue: 1900 },
    { date: '2023-05-06', revenue: 2400 },
    { date: '2023-05-07', revenue: 2100 },
    { date: '2023-05-08', revenue: 1700 },
    { date: '2023-05-09', revenue: 1500 },
    { date: '2023-05-10', revenue: 2000 },
    { date: '2023-05-11', revenue: 2300 },
    { date: '2023-05-12', revenue: 1800 },
    { date: '2023-05-13', revenue: 2100 },
    { date: '2023-05-14', revenue: 2500 },
    { date: '2023-05-15', revenue: 2200 },
  ],
};
const initialProducts: Product[] = [
  {
    id: 'b2335b40-8ba8-4176-8942-d4ced0cadb08',
    createdAt: '2025-03-04T23:06:48.000Z',
    totalItem: 1,
    name: 'Elegant Silver Cup',
    description: 'A stylish silver-plated ceramic cup for a touch of luxury.',
    productTypes: [
      {
        id: '835200cb-5b7e-42e6-acb7-282c77aa732d',
        createdAt: '2025-03-05T01:51:01.000Z',
        cartId: 'b2335b40-8ba8-4176-8942-d4ced0cadb08',
        productType: {
          id: '46a3077c-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-04T20:52:36.000Z',
          name: 'Vintage Style',
          description: '280ml vintage-inspired ceramic cup.',
          price: '14.99',
          stock: 15,
          imageUrl: 'assets/images/cup_demo_3.webp',
        },
      },
    ],
  },
  {
    id: 'c4567d80-9ca9-5287-9053-e5ded1bcde19',
    createdAt: '2025-03-03T21:15:32.000Z',
    totalItem: 1,
    name: 'Modern Wooden Chair',
    description:
      'Sleek wooden chair with ergonomic design for comfort and style.',
    productTypes: [
      {
        id: '946311dc-6c8f-53f7-bdb8-393d88bb843e',
        createdAt: '2025-03-03T22:30:45.000Z',
        cartId: 'c4567d80-9ca9-5287-9053-e5ded1bcde19',
        productType: {
          id: '57b4188d-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-03T20:10:22.000Z',
          name: 'Natural Oak',
          description: 'Solid oak chair with natural finish.',
          price: '149.99',
          stock: 8,
          imageUrl: 'assets/images/cup_demo_1.webp',
        },
      },
    ],
  },
  {
    id: 'd5678e90-0db0-6398-0164-f6efe2cdef20',
    createdAt: '2025-03-02T18:42:15.000Z',
    totalItem: 2,
    name: 'Minimalist Table Lamp',
    description:
      'Contemporary table lamp with adjustable brightness for any setting.',
    productTypes: [
      {
        id: '057422ed-7d9g-64g8-cec9-4a4e99cc954f',
        createdAt: '2025-03-02T19:15:30.000Z',
        cartId: 'd5678e90-0db0-6398-0164-f6efe2cdef20',
        productType: {
          id: '68c5299e-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-02T17:30:10.000Z',
          name: 'Matte Black',
          description: 'Matte black finish with brass accents.',
          price: '89.99',
          stock: 12,
          imageUrl: 'assets/images/cup_demo_1.webp',
        },
      },
    ],
  },
  {
    id: 'e6789f01-1ec1-7409-1275-g7fff3deg31',
    createdAt: '2025-03-01T15:20:45.000Z',
    totalItem: 1,
    name: 'Artisan Coffee Mug',
    description:
      'Hand-crafted ceramic mug perfect for your morning coffee or tea.',
    productTypes: [
      {
        id: '168533fe-8e0h-75h9-dfd0-5b5f00dd065g',
        createdAt: '2025-03-01T16:05:22.000Z',
        cartId: 'e6789f01-1ec1-7409-1275-g7fff3deg31',
        productType: {
          id: '79d63a0f-f975-11ef-8624-0242ac110002',
          createdAt: '2025-03-01T14:45:55.000Z',
          name: 'Speckled Clay',
          description: 'Speckled clay finish with glazed interior.',
          price: '24.99',
          stock: 20,
          imageUrl: 'assets/images/cup_demo_2.webp',
        },
      },
    ],
  },
  {
    id: 'f7890g12-2fd2-8510-2386-h8ggg4efh42',
    createdAt: '2025-02-28T12:10:30.000Z',
    totalItem: 1,
    name: 'Scandinavian Side Table',
    description:
      'Simple yet elegant side table inspired by Scandinavian design principles.',
    productTypes: [
      {
        id: '279644gf-9f1i-86i0-ege1-6c6g11ee176h',
        createdAt: '2025-02-28T13:25:15.000Z',
        cartId: 'f7890g12-2fd2-8510-2386-h8ggg4efh42',
        productType: {
          id: '80e74b1g-f975-11ef-8624-0242ac110002',
          createdAt: '2025-02-28T11:20:40.000Z',
          name: 'White Birch',
          description: 'White birch wood with tapered legs.',
          price: '119.99',
          stock: 5,
          imageUrl: 'assets/images/cup_demo_1.webp',
        },
      },
    ],
  },
];

const AdminDashboard: React.FC = () => {
  const { data: orders, isLoading } = useOrders({ page: 1, filters: {} });
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        <motion.div
          className="container mx-auto px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div
            className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center"
            variants={childVariants}
          >
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your store and view analytics
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700">
                Generate Reports
              </button>
            </div>
          </motion.div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <RevenueAnalytics revenue={revenueData} />
          )}

          {/* Orders Content */}
          {activeTab === 'orders' && (
            <OrdersTable
              orders={orders?.data || []}
              updateOrderStatus={updateOrderStatus}
            />
          )}

          {/* Products Content */}
          {activeTab === 'products' && <ProductsTable />}

          {/* Customers Content */}
          {activeTab === 'customers' && (
            <motion.div variants={childVariants}>
              <h2 className="mb-4 text-xl font-semibold">
                Customer Management
              </h2>
              <p>Customer management interface will be implemented here.</p>
            </motion.div>
          )}

          {/* Settings Content */}
          {activeTab === 'settings' && (
            <motion.div variants={childVariants}>
              <h2 className="mb-4 text-xl font-semibold">Settings</h2>
              <p>Settings interface will be implemented here.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
