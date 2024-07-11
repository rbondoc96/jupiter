import { composeClassName } from '@jupiter/web';
import { Title } from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const SheetPrimitiveTitle = forwardRef<
    ElementRef<typeof Title>,
    ComponentPropsWithoutRef<typeof Title>
>(({
    children,
    className,
    ...props
}, ref) => (
    <Title
        ref={ref}
        className={composeClassName(
            'text-lg font-semibold text-foreground',
            className,
        )}
        {...props}
    >
        {children}
    </Title>
));

SheetPrimitiveTitle.displayName = 'SheetPrimitiveTitle';