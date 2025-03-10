import { motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

import { useProducts } from '../../shopping/api/get-products';
import { useOrders } from '../api/get-orders';
import { sampleCustomers } from '../api/sample-customer';
import { Order, OrderStatus } from '../types/order';
import { Product } from '../types/product';
import { Revenue } from '../types/revenue';

import CustomersTable from './customer-table';
import OrdersTable from './order-table';
import ProductsTable from './products-table';
import RevenueAnalytics from './revenue-analytic';
import Sidebar from './sidebar';

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
              <CustomersTable customers={sampleCustomers} />
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
