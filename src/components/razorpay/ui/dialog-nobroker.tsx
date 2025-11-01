import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "./utils";

const DialogNoBroker = DialogPrimitive.Root;

const DialogTriggerNoBroker = DialogPrimitive.Trigger;

const DialogPortalNoBroker = DialogPrimitive.Portal;

const DialogCloseNoBroker = DialogPrimitive.Close;

const DialogOverlayNoBroker = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[10000] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlayNoBroker.displayName = `NoBroker${DialogPrimitive.Overlay.displayName}`;

const DialogContentNoBroker = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortalNoBroker>
    <DialogOverlayNoBroker />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-[10010] grid w-[min(22rem,100vw-1.5rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border/70 bg-transparent shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl",
        className,
      )}
      {...props}
    >
      <div className="nb-theme-vars rounded-2xl border border-border/60 bg-background p-5 shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
        {children}
      </div>
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 disabled:pointer-events-none">
        Close
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortalNoBroker>
));
DialogContentNoBroker.displayName = `NoBroker${DialogPrimitive.Content.displayName}`;

const DialogHeaderNoBroker = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeaderNoBroker.displayName = "NoBrokerDialogHeader";

const DialogFooterNoBroker = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooterNoBroker.displayName = "NoBrokerDialogFooter";

const DialogTitleNoBroker = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitleNoBroker.displayName = `NoBroker${DialogPrimitive.Title.displayName}`;

const DialogDescriptionNoBroker = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescriptionNoBroker.displayName = `NoBroker${DialogPrimitive.Description.displayName}`;

export {
  DialogNoBroker ,
  DialogPortalNoBroker ,
  DialogOverlayNoBroker ,
  DialogCloseNoBroker,
  DialogTriggerNoBroker ,
  DialogContentNoBroker ,
  DialogHeaderNoBroker,
  DialogFooterNoBroker ,
  DialogTitleNoBroker ,
  DialogDescriptionNoBroker ,
};
