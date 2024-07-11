import { composeClassName } from '@jupiter/web';
import { Description } from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const SheetPrimitiveDescription = forwardRef<
    ElementRef<typeof Description>,
    ComponentPropsWithoutRef<typeof Description>
>(({
    children,
    className,
    ...props
}, ref) => (
    <Description
        className={composeClassName(
            'text-sm text-muted-foreground',
            className,
        )}
        ref={ref}
        {...props}
    >
        {children}
    </Description>
));

SheetPrimitiveDescription.displayName = 'SheetPrimitiveDescription';
