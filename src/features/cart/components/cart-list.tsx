import type React from 'react';
import { useState } from 'react';

import { useCart } from '../api/get-cart';
import { useUpdateCartItemQuantity } from '../api/update-cart-item';

export const CartList: React.FC = () => {
  const { data: cart, refetch } = useCart();
  const updateQuantityMutation = useUpdateCartItemQuantity();

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateQuantityMutation.mutate({ itemId, quantity: newQuantity });
  };
  const [couponCode, setCouponCode] = useState<string>('');
  const shippingRate = 20.0;

  const updateCart = (): void => {
    console.log('Cart updated');
  };

  const applyCoupon = (): void => {
    console.log('Applying coupon:', couponCode);
  };
  const calculateSubtotal = (): number => {
    return (
      cart?.cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0,
      ) || 0
    );
  };

  const handleRemoveItem = async (id: string): Promise<void> => {
    const confirmRemove = window.confirm(
      'Are you sure you want to remove this item?',
    );
    if (!confirmRemove) return;
    try {
      handleUpdateQuantity(id, 0);
      refetch();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleQuantityChange = async (
    id: string,
    quantity: number,
  ): Promise<void> => {
    if (quantity === 0) {
      const confirmRemove = window.confirm(
        'Are you sure you want to remove this item?',
      );
      if (!confirmRemove) return;
    }
    try {
      handleUpdateQuantity(id, quantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:grid lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-2">
        <div className="hidden border-b pb-4 font-semibold md:grid md:grid-cols-12">
          <div className="col-span-6">PRODUCT</div>
          <div className="col-span-2 text-center">PRICE</div>
          <div className="col-span-2 text-center">QUANTITY</div>
          <div className="col-span-2 text-center">TOTAL</div>
        </div>

        <div className="border-b">
          {cart?.cartItems?.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 border-b py-6 last:border-b-0 md:grid-cols-12"
            >
              <div className="flex items-center md:col-span-6">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mr-4 text-2xl text-red-500"
                  aria-label="Remove item"
                >
                  ×
                </button>
                <div className="mr-4 size-20 shrink-0 border">
                  <img
                    src={
                      item.productType.imageUrl ||
                      'assets/images/placeholder.svg'
                    }
                    alt={item.productType.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="font-medium">{item.productType.name}</div>
              </div>
              <div className="flex items-center md:col-span-2 md:justify-center">
                <span className="font-medium text-red-500">${item.price}</span>
              </div>
              <div className="flex items-center md:col-span-2 md:justify-center">
                <div className="flex rounded border">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="flex size-8 items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value);
                      if (!isNaN(val)) {
                        handleQuantityChange(item.id, val);
                      }
                    }}
                    className="h-8 w-10 border-x text-center"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="flex size-8 items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center md:col-span-2 md:justify-center">
                <span className="font-medium text-red-500">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded bg-gray-50 p-6 lg:mt-0">
        <h2 className="mb-6 text-lg font-semibold">Cart totals</h2>
        <div className="flex justify-between border-b py-4">
          <span>Subtotal</span>
          <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="border-b py-4">
          <div className="flex justify-between">
            <span>Shipping</span>
            <div className="text-right">
              <div>Flat Rate: ${shippingRate}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-4 font-semibold">
          <span>Total</span>
          <span className="text-red-500">
            ${(calculateSubtotal() + shippingRate).toFixed(2)}
          </span>
        </div>
        <button className="mt-4 w-full rounded bg-red-500 py-4 font-semibold text-white hover:bg-red-600">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};
