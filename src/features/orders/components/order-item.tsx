import { motion, AnimatePresence } from 'framer-motion';
import type React from 'react';

import { formatCurrency, formatDate } from '@/utils/format';

import type { Order } from '../types/order';

interface OrderItemProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  isExpanded,
  onToggleExpand,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate subtotal
  const subtotal =
    Number.parseFloat(order.totalPrice) -
    Number.parseFloat(order.deliveryCharge);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div
        className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
        onClick={onToggleExpand}
      >
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-2 flex items-center space-x-4 sm:mb-0">
            <span className="text-sm text-gray-500">
              {formatDate(order.createdAt)}
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Order ID</div>
              <div className="font-medium">{order.id.substring(0, 8)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-medium">
                {formatCurrency(Number.parseFloat(order.totalPrice))}
              </div>
            </div>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="bg-gray-50 p-4">
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">
                    Order Details
                  </h4>
                  <p className="text-sm">
                    <span className="font-medium">Order ID:</span> {order.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>{' '}
                    {formatDate(order.createdAt, true)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Delivery Address ID:</span>{' '}
                    {order.deliveryAddressId}
                  </p>
                  {order.orderNote && (
                    <p className="mt-2 text-sm">
                      <span className="font-medium">Note:</span>{' '}
                      {order.orderNote}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">
                    Price Details
                  </h4>
                  <p className="text-sm">
                    <span className="font-medium">Subtotal:</span>{' '}
                    {formatCurrency(subtotal)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Delivery Charge:</span>{' '}
                    {formatCurrency(Number.parseFloat(order.deliveryCharge))}
                  </p>
                  <p className="text-sm font-medium">
                    <span className="font-medium">Total:</span>{' '}
                    {formatCurrency(Number.parseFloat(order.totalPrice))}
                  </p>
                </div>
              </div>

              {order.orderItems && order.orderItems.length > 0 ? (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-500">
                    Order Items
                  </h4>
                  <div className="grid gap-4">
                    {order.orderItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row"
                      >
                        <div className="mx-auto size-24 shrink-0 overflow-hidden rounded-md bg-gray-100 sm:mx-0">
                          <img
                            src={
                              item.productType.imageUrl || '/placeholder.svg'
                            }
                            alt={item.productType.product.name}
                            className="size-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                'https://via.placeholder.com/100?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">
                                {item.productType.product.name}
                              </h5>
                              <p className="text-sm text-gray-500">
                                {item.productType.name}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {item.productType.description}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:text-right">
                              <p className="text-sm text-gray-900">
                                {formatCurrency(Number.parseFloat(item.price))}{' '}
                                × {item.quantity}
                              </p>
                              <p className="font-medium text-gray-900">
                                {formatCurrency(
                                  Number.parseFloat(item.price) * item.quantity,
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm italic text-gray-500">
                  No item details available
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderItem;
