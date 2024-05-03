import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {Title} from '@radix-ui/react-dialog';
import {composeClassName} from '@/utilities/styles';

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