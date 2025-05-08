
"use client";

import * as React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./dialog";

export interface FixedDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const FixedDialog = ({
  children,
  ...props
}: FixedDialogProps) => {
  return <Dialog {...props}>{children}</Dialog>;
};

export const FixedDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => (
  <DialogContent ref={ref} className={className} {...props}>
    {children}
  </DialogContent>
));

FixedDialogContent.displayName = "FixedDialogContent";

export {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
