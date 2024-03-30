import {Separator} from '@radix-ui/react-dropdown-menu';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {composeClassName} from '@/utilities/styles';

export const DropdownMenuSeparator = forwardRef<
    ElementRef<typeof Separator>,
    ComponentPropsWithoutRef<typeof Separator>
>(({
    children,
    className,
    ...props
}, ref) => (
    <Separator
        ref={ref}
        className={composeClassName(
            '-mx-1 my-1 h-px bg-muted',
            className,
        )}
        {...props}
    >
        {children}
    </Separator>
));

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
