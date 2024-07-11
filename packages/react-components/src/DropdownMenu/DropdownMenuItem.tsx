import { composeClassName } from '@jupiter/web';
import { Item } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const DropdownMenuItem = forwardRef<
    ElementRef<typeof Item>,
    ComponentPropsWithoutRef<typeof Item> & { inset?: boolean }
>(({ children, className, inset, ...props }, ref) => (
    <Item
        ref={ref}
        className={composeClassName(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            inset && 'pl-8',
            className,
        )}
        {...props}
    >
        {children}
    </Item>
));

DropdownMenuItem.displayName = 'DropdownMenuItem';
