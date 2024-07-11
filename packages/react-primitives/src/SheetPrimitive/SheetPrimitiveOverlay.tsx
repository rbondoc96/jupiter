import { composeClassName } from '@jupiter/web';
import { Overlay } from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const SheetPrimitiveOverlay = forwardRef<
    ElementRef<typeof Overlay>,
    ComponentPropsWithoutRef<typeof Overlay>
>(({
    children,
    className,
    ...props
}, ref) => (
    <Overlay
        className={composeClassName(
            'fixed inset-0 z-50',
            'bg-black/80',
            'fill-mode-forwards',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            className,
        )}
        {...props}
        ref={ref}
    >
        {children}
    </Overlay>
));

SheetPrimitiveOverlay.displayName = 'SheetPrimitiveOverlay';
