import { AlertTriangle } from 'lucide-react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="mb-4 size-12 text-destructive" />
          <DialogHeader>
            <DialogTitle className="text-xl">Cancel Order</DialogTitle>
            <DialogDescription className="mt-2">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex w-full flex-col gap-2">
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Canceling...' : 'Yes, Cancel Order'}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
              disabled={isLoading}
            >
              No, Keep Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
