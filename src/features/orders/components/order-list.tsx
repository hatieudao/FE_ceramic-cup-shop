'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

import { useCancelOrder } from '../api/cancel-order';
import { Order } from '../types/order';

import CancelOrderModal from './cancel-order-modal';
import OrderItem from './order-item';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const cancelOrderMutation = useCancelOrder();

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;

    try {
      await cancelOrderMutation.mutateAsync(orderToCancel);
      setOrderToCancel(null);
    } catch (error) {
      // Handle error if needed
      console.error('Failed to cancel order:', error);
    }
  };

  if (orders.length === 0) {
    return (
      <motion.div
        className="rounded-lg bg-white p-8 text-center shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No orders found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters to see more results.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <OrderItem
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggleExpand={() => toggleOrderExpand(order.id)}
              onCancelOrder={
                order.status === 'pending'
                  ? () => handleCancelOrder(order.id)
                  : undefined
              }
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <CancelOrderModal
        isOpen={!!orderToCancel}
        onClose={() => setOrderToCancel(null)}
        onConfirm={handleConfirmCancel}
        isLoading={cancelOrderMutation.isPending}
      />
    </div>
  );
};

export default OrderList;
