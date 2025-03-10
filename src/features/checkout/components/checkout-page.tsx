import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Footer from '../../../app/routes/landing/footer';
import { useCart } from '../../cart/api/get-cart';
import { useCreateOrder } from '../api/create-order';
import { addressFormSchema, AddressFormValues } from '../types/order-adress';

import ConfirmOrderModal from './confirm-order-modal';
import CountrySelect from './country-select';
import OrderSummary from './order-summary';
import SuccessModal from './success-modal';

// Payment method constants
const paymentMethods = {
  bankTransfer: {
    id: 'bank-transfer',
    title: 'DIRECT BANK TRANSFER',
    desc: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
  },
  cashOnDelivery: {
    id: 'cod',
    title: 'CASH ON DELIVERY',
    desc: 'Pay with cash upon delivery.',
  },
  chequePayment: {
    id: 'cheque',
    title: 'CHEQUE PAYMENTS',
    desc: 'Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.',
  },
};

const CheckoutPage: React.FC = () => {
  // Replace the existing useState declarations with this cart data
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethods.bankTransfer.id,
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { data: cartData, isLoading: isCartLoading } = useCart();
  // Add this state after the other useState declarations
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder({
    onSuccessCallback: () => setIsSuccessModalOpen(true),
  });
  // Initialize form with react-hook-form and zod resolver
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: 'hoang anh',
      addressLine1: '123 main st',
      addressLine2: '',
      city: 'ho chi minh',
      state: 'ho chi minh',
      postalCode: '12345',
      country: 'VN', // Vietnam as default
      phone: '1234567890',
      email: 'trumbien2001@gmail.com',
      isDefault: false,
      addressName: 'home',
      orderNote: 'Happy to be here',
    },
  });

  // Form submission handler
  const onSubmit = (data: AddressFormValues) => {
    setIsConfirmModalOpen(true);
  };

  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    // Format the data to match the Address table structure
    const addressData = {
      addressLine1: getValues('addressLine1'),
      addressLine2: getValues('addressLine2') || null,
      city: getValues('city'),
      state: getValues('state'),
      postalCode: getValues('postalCode'),
      country: getValues('country'),
      phone: getValues('phone'),
      isDefault: getValues('isDefault'),
      addressName: getValues('addressName'),
      // user_id would be added by the backend
    };

    console.log('Address data for database:', addressData);
    console.log('Complete form data:', getValues());
    // Simulate a successful order placement
    setIsConfirmModalOpen(false);
    createOrder({
      data: getValues(),
      onSuccessCallback: () => {
        setIsSuccessModalOpen(true);
        navigate('/');
      },
    });
  };

  // Add this function to handle closing the success modal
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // You could redirect to the home page or another page here
  };

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  if (!cartData) {
    return <div>No cart data found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Coupon Notice */}
        <div className="mb-8 rounded bg-gray-100 p-4">
          <button
            className="flex items-center font-medium text-blue-600"
            onClick={() => setCouponExpanded(!couponExpanded)}
          >
            Have A Coupon? Click Here To Enter Your Code.
            <ChevronDown className="ml-2 size-4" />
          </button>

          {couponExpanded && (
            <div className="mt-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 rounded border border-gray-300 px-4 py-2"
                />
                <button className="rounded bg-blue-600 px-6 py-2 font-medium text-white">
                  Apply Coupon
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Billing Details */}
          <div className="lg:w-7/12">
            <h2 className="mb-6 text-2xl font-bold">Billing Details</h2>

            <form
              id="checkout-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  {...register('fullName')}
                  className={`w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Country <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <CountrySelect
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.country?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('addressLine1')}
                  placeholder="House number and street name"
                  className={`w-full border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} mb-4 rounded px-4 py-2`}
                />
                {errors.addressLine1 && (
                  <p className="mb-4 mt-1 text-sm text-red-500">
                    {errors.addressLine1.message}
                  </p>
                )}
                <label className="mb-2 block text-sm font-medium">
                  Address Line 2
                </label>
                <input
                  {...register('addressLine2')}
                  placeholder="Apartment, suite, unit etc. (optional)"
                  className="w-full rounded border border-gray-300 px-4 py-2"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('city')}
                  className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  State / County <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('state')}
                  className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('postalCode')}
                  className={`w-full border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Address Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="home"
                      {...register('addressName')}
                      className="mr-2"
                    />
                    Home
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="work"
                      {...register('addressName')}
                      className="mr-2"
                    />
                    Work
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="other"
                      {...register('addressName')}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is-default"
                  className="size-5 rounded text-blue-600"
                  {...register('isDefault')}
                />
                <label
                  htmlFor="is-default"
                  className="ml-2 text-sm font-medium"
                >
                  Set as default address
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Order Notes
                </label>
                <textarea
                  {...register('orderNote')}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  rows={4}
                  className="w-full rounded border border-gray-300 px-4 py-2"
                />
              </div>

              {/* Order Summary for Mobile */}
              <div className="lg:hidden">
                <OrderSummary
                  cartData={cartData}
                  paymentMethods={paymentMethods}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  isMobile={true}
                  isCreatingOrder={isCreatingOrder}
                />
              </div>
            </form>
          </div>

          {/* Order Summary for Desktop */}
          <div className="hidden lg:block lg:w-5/12">
            <OrderSummary
              cartData={cartData}
              paymentMethods={paymentMethods}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isMobile={false}
              isCreatingOrder={isCreatingOrder}
            />
          </div>
        </div>
        {/* Confirmation Modal */}
        <ConfirmOrderModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmOrder}
        />
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
          orderNumber={orderNumber}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
