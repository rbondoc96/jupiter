import { composeClassName } from '@jupiter/web';
import { Content as RadixContent, Portal as RadixPortal, Viewport as RadixViewport } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { SelectPrimitiveScrollDownButton } from './SelectPrimitiveScrollDownButton';
import { SelectScrollUpButton } from './SelectScrollUpButton';

export type SelectPrimitiveContentClassNames = Partial<{
    root: string;
    scrollDownButton: string;
    scrollUpButton: string;
}>;

type SelectPrimitiveContentProps = Omit<ComponentPropsWithoutRef<typeof RadixContent>, 'className'> & {
    classNames?: SelectPrimitiveContentClassNames;
};

export const SelectPrimitiveContent = forwardRef<ElementRef<typeof RadixContent>, SelectPrimitiveContentProps>(
    ({ classNames, children, position = 'popper', ...props }, ref) => (
        <RadixPortal>
            <RadixContent
                ref={ref}
                align="center"
                position={position}
                className={composeClassName(
                    'relative z-50 bg-popover',
                    'max-h-96 min-w-[8rem]',
                    'overflow-hidden',
                    'rounded-md border',
                    'shadow-md',
                    'text-popover-foreground',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                    'data-[side=top]:slide-in-from-bottom-2',
                    'data-[side=bottom]:slide-in-from-top-2',
                    'data-[side=left]:slide-in-from-right-2',
                    'data-[side=right]:slide-in-from-left-2',
                    position === 'popper' && 'data-[side=top]:-translate-y-1' + 'data-[side=bottom]:translate-y-1',
                    +'data-[side=left]:-translate-x-1',
                    +'data-[side=right]:translate-x-1',
                    classNames?.root,
                )}
                {...props}
            >
                <SelectScrollUpButton className={classNames?.scrollUpButton} />

                <RadixViewport
                    className={composeClassName(
                        'p-1',
                        position === 'popper' &&
                            'w-full' +
                                'h-[var(--radix-select-trigger-height)]' +
                                'min-w-[var(--radix-select-trigger-width)]',
                    )}
                >
                    {children}
                </RadixViewport>

                <SelectPrimitiveScrollDownButton className={classNames?.scrollDownButton} />
            </RadixContent>
        </RadixPortal>
    ),
);

SelectPrimitiveContent.displayName = 'SelectPrimitiveContent';
