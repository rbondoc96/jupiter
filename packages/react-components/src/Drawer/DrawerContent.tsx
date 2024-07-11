import { composeClassName } from '@jupiter/web';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Drawer as VaulDrawer } from 'vaul';

import { DrawerOverlay } from './DrawerOverlay';

export const DrawerContent = forwardRef<
    ElementRef<typeof VaulDrawer.Content>,
    ComponentPropsWithoutRef<typeof VaulDrawer.Content>
>(({ children, className }, ref) => {
    return (
        <VaulDrawer.Portal>
            <DrawerOverlay />

            <VaulDrawer.Content
                className={composeClassName(
                    'fixed inset-x-0 bottom-0 z-50',
                    'mt-24 flex h-auto flex-col rounded-t-[10px]',
                    'border bg-background',
                    className,
                )}
                ref={ref}
            >
                <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
                {children}
            </VaulDrawer.Content>
        </VaulDrawer.Portal>
    );
});

DrawerContent.displayName = 'DrawerContent';
