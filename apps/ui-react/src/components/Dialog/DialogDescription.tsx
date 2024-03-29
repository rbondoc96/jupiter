import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {Description} from '@radix-ui/react-dialog';
import {composeClassName} from '@/utilities/styles';

export const DialogDescription = forwardRef<
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

DialogDescription.displayName = 'DialogDescription';
