import type React from 'react';

import { Cart } from '../../cart/types/cart-item';

import PaymentMethodSelector from './payment-method-selector';

type ProductType = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
};

type CartItem = {
  id: string;
  createdAt: string;
  cartId: string;
  productType: ProductType;
  productTypeId: string;
  quantity: number;
  price: string;
};

type PaymentMethodsObject = {
  [key: string]: {
    id: string;
    title: string;
    desc: string;
  };
};

interface OrderSummaryProps {
  cartData: Cart;
  paymentMethods: PaymentMethodsObject;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  isMobile: boolean;
  isCreatingOrder: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartData,
  paymentMethods,
  paymentMethod,
  setPaymentMethod,
  isMobile,
  isCreatingOrder,
}) => {
  const calculateSubtotal = () => {
    return cartData.cartItems
      .reduce((total, item) => {
        return total + Number.parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const shippingCost = 10;

  const calculateTotal = () => {
    return (Number.parseFloat(calculateSubtotal()) + shippingCost).toFixed(2);
  };

  return (
    <div className="rounded bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-bold">Your Order</h2>

      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="mb-4 flex justify-between font-bold">
          <span>PRODUCT</span>
          <span>TOTAL</span>
        </div>

        <div className="space-y-4">
          {cartData.cartItems.map((item) => (
            <div key={item.id} className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="font-medium">
                  {item.productType.name} × {item.quantity}
                </div>
                <div className="text-xs text-gray-500">
                  {item.productType.description}
                </div>
              </div>
              <div className="whitespace-nowrap font-medium">
                ${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="mb-4 flex justify-between">
          <span className="font-medium">SUBTOTAL</span>
          <span>${calculateSubtotal()}</span>
        </div>
      </div>

      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="mb-4 flex justify-between">
          <span className="font-medium">SHIPPING</span>
          <span>Flat Rate: ${shippingCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-300 pb-4">
        <div className="flex justify-between font-bold">
          <span>ORDER TOTAL</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6 space-y-4">
        <PaymentMethodSelector
          methods={paymentMethods}
          selectedMethod={paymentMethod}
          onChange={setPaymentMethod}
          isMobile={isMobile}
        />
      </div>

      <div className="mb-6 text-sm text-gray-600">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </div>

      <button
        type="submit"
        form="checkout-form"
        className="w-full rounded bg-blue-600 py-3 font-bold text-white"
        disabled={isCreatingOrder}
      >
        {isCreatingOrder ? 'PLACING ORDER...' : 'PLACE ORDER'}
      </button>

      {!isMobile && (
        <div className="mt-6 text-sm text-gray-600">
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms.
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
