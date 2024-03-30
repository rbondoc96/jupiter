import {Label} from '@radix-ui/react-dropdown-menu';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {composeClassName} from '@/utilities/styles';

export const DropdownMenuLabel = forwardRef<
    ElementRef<typeof Label>,
    ComponentPropsWithoutRef<typeof Label> & {inset?: boolean}
>(({
    children,
    className,
    inset,
    ...props
}, ref) => (
    <Label
        ref={ref}
        className={composeClassName(
            'px-2 py-1.5 text-sm font-semibold',
            inset && 'pl-8',
            className,
        )}
        {...props}
    >
        {children}
    </Label>
));

DropdownMenuLabel.displayName = 'DropdownMenuLabel';