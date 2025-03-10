import { CheckCircle } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber = '12345678',
}) => {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="mb-4 size-16 text-green-500" />
          <DialogHeader>
            <DialogTitle className="text-xl">
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription className="mt-2">
              Thank you for your purchase. Your order #{orderNumber} has been
              confirmed and is now being processed.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 w-full">
            <div className="mb-6 rounded-md bg-gray-50 p-4 text-left">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address. You
                can track your order status in your account.
              </p>
            </div>
            <Button
              onClick={() => navigate('/shop')}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
