'use client';

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

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="mb-4 size-12 text-destructive" />
          <DialogHeader>
            <DialogTitle className="text-xl">Are you sure?</DialogTitle>
            <DialogDescription className="mt-2">
              Please confirm that you want to place this order. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex w-full flex-col gap-2">
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="w-full"
            >
              Place Order
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmOrderModal;
