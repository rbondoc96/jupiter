import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {Drawer as VaulDrawer} from 'vaul';
import {composeClassName} from '@/utilities';

export const DrawerOverlay = forwardRef<
    ElementRef<typeof VaulDrawer.Overlay>,
    ComponentPropsWithoutRef<typeof VaulDrawer.Overlay>
>(({
    children,
    className,
    ...props
}, ref) => (
    <VaulDrawer.Overlay
        ref={ref}
        className={composeClassName('fixed inset-0 z-59 bg-black/80', className)}
        {...props}
    >
        {children}
    </VaulDrawer.Overlay>
));

DrawerOverlay.displayName = VaulDrawer.Overlay.displayName;
