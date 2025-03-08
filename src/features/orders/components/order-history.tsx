import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useOrders } from '../api/get-orders';
import { Order, OrderStatus } from '../types/order';

import { fetchOrders } from './api';
import FilterBar from './filter-bar';
import OrderList from './order-list';

function App() {
  const { data: orders, isLoading } = useOrders({ page: 1, filters: {} });
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState({
    status: 'all' as 'all' | OrderStatus,
    dateRange: {
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
    searchTerm: '',
  });

  useEffect(() => {
    let result = [...(orders?.data || [])];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter((order) => order.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate >= filters.dateRange.startDate! &&
          orderDate <= filters.dateRange.endDate!
        );
      });
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.orderNote?.toLowerCase().includes(searchLower) ||
          order.orderItems.some(
            (item) =>
              item.productType.product.name
                .toLowerCase()
                .includes(searchLower) ||
              item.productType.name.toLowerCase().includes(searchLower),
          ),
      );
    }

    setFilteredOrders(result);
  }, [filters, orders]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.h1
          className="mb-8 text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Order History
        </motion.h1>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-64 items-center justify-center"
            >
              <div className="size-12 animate-spin rounded-full border-y-2 border-blue-500"></div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OrderList orders={filteredOrders} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
