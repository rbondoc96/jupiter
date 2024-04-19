import {Content as RadixContent, Portal as RadixPortal} from '@radix-ui/react-popover';
import {cx} from 'class-variance-authority';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';

export const PopoverPrimitiveContent = forwardRef<
    ElementRef<typeof RadixContent>,
    ComponentPropsWithoutRef<typeof RadixContent>
>(({
    align,
    children,
    className,
    sideOffset = 4,
    ...props
}, ref) => (
    <RadixPortal>
        <RadixContent
            ref={ref}
            align={align}
            className={cx(
                'z-50',
                'w-72',
                'p-4',
                'bg-popover shadow-md',
                'rounded-md border outline-none',
                'text-popover-foreground',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2',
                'data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2',
                'data-[side=top]:slide-in-from-bottom-2',
                className,
            )}
            sideOffset={sideOffset}
            {...props}
        >
            {children}
        </RadixContent>
    </RadixPortal>
));

PopoverPrimitiveContent.displayName = 'PopoverPrimitiveContent';
