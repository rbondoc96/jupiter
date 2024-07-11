import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { composeClassName } from '@jupiter/web';
import { Close, Content, Portal } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { DialogPrimitiveOverlay } from '../DialogPrimitive/DialogPrimitiveOverlay';

const sheetVariants = cva(
    [
        'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
        'fill-mode-forwards',
        'data-[state=open]:animate-in data-[state=open]:duration-500',
        'data-[state=closed]:animate-out data-[state=closed]:duration-300',
    ],
    {
        variants: {
            side: {
                top: [
                    'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
                ],
                bottom: [
                    'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                ],
                left: [
                    'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
                ],
                right: [
                    'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
                ],
                center: [
                    'left-[50%] top-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border duration-200',
                    'sm:rounded-lg',
                    'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
                    'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
                ],
            },
        },
        defaultVariants: {
            side: 'right',
        },
    },
);

type SheetPrimitiveContentProps = ComponentPropsWithoutRef<typeof Content> & VariantProps<typeof sheetVariants>;

export const SheetPrimitiveContent = forwardRef<ElementRef<typeof Content>, SheetPrimitiveContentProps>(
    ({ children, className, side = 'right', ...props }, ref) => (
        <Portal>
            <DialogPrimitiveOverlay />
            <Content ref={ref} className={composeClassName(sheetVariants({ side }), className)} {...props}>
                {children}
                <Close
                    className={composeClassName(
                        'absolute right-4 top-4',
                        'rounded-sm opacity-70 ring-offset-background transition-opacity',
                        'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        'disabled:pointer-events-none',
                        'data-[state=open]:bg-secondary',
                    )}
                >
                    <FontAwesomeIcon fixedWidth icon={faX} className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Close>
            </Content>
        </Portal>
    ),
);

SheetPrimitiveContent.displayName = 'SheetPrimitiveContent';
