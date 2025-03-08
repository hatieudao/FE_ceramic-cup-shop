import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type PaymentMethod = {
  id: string;
  title: string;
  desc: string;
};

type PaymentMethodsObject = {
  [key: string]: PaymentMethod;
};

interface PaymentMethodSelectorProps {
  methods: PaymentMethodsObject;
  selectedMethod: string;
  onChange: (methodId: string) => void;
  isMobile: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  methods,
  selectedMethod,
  onChange,
  isMobile,
}) => {
  return (
    <div className="space-y-4">
      {Object.values(methods).map((method) => (
        <div key={method.id} className="payment-method">
          <div className="flex items-start">
            <input
              type="radio"
              id={isMobile ? `${method.id}-mobile` : method.id}
              name={isMobile ? 'payment-method-mobile' : 'payment-method'}
              className="mt-1 size-4"
              checked={selectedMethod === method.id}
              onChange={() => onChange(method.id)}
            />
            <label
              htmlFor={isMobile ? `${method.id}-mobile` : method.id}
              className="ml-2 w-full"
            >
              <div className="font-medium">{method.title}</div>
              <AnimatePresence key={method.id}>
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="mt-2 text-sm text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {method.desc}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
