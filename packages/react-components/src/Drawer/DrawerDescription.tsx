import { composeClassName } from '@jupiter/web';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Drawer as VaulDrawer } from 'vaul';

export const DrawerDescription = forwardRef<
    ElementRef<typeof VaulDrawer.Description>,
    ComponentPropsWithoutRef<typeof VaulDrawer.Description>
>(({
    children,
    className,
    ...props
}, ref) => (
    <VaulDrawer.Description
        ref={ref}
        className={composeClassName('text-sm text-muted-foreground', className)}
        {...props}
    >
        {children}
    </VaulDrawer.Description>
));

DrawerDescription.displayName = VaulDrawer.Description.displayName;