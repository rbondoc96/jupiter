import { composeClassName } from '@jupiter/web';
import { Content, Portal } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const DropdownMenuContent = forwardRef<
    ElementRef<typeof Content>,
    ComponentPropsWithoutRef<typeof Content>
>(({
    children,
    className,
    sideOffset = 4,
    ...props
}, ref) => (
    <Portal>
        <Content
            ref={ref}
            sideOffset={sideOffset}
            className={composeClassName(
                'z-50',
                'min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
                'focus-visible:ring-0',
                'fill-mode-forwards',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=top]:slide-in-from-bottom-2',
                'data-[side=bottom]:slide-in-from-top-2',
                'data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2',
                className,
            )}
            {...props}
        >
            {children}
        </Content>
    </Portal>
));

DropdownMenuContent.displayName = 'DropdownMenuContent';