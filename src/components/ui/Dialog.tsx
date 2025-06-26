import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { DialogProps } from '@/types/components.types';

const CustomDialog = ({
  open,
  onOpenChange,
  title,
  children,
  trigger,
}: DialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>
          <div className="dialog-body">{children}</div>
          <Dialog.Close asChild>
            <button className="dialog-close" aria-label="Close">
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CustomDialog;
