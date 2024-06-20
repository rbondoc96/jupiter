import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {Drawer as VaulDrawer} from 'vaul';
import {composeClassName} from '@/utilities';

export const DrawerTitle = forwardRef<
    ElementRef<typeof VaulDrawer.Title>,
    ComponentPropsWithoutRef<typeof VaulDrawer.Title>
>(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <VaulDrawer.Title
            className={composeClassName('text-lg font-semibold leading-none tracking-tight', className)}
            ref={ref}
            {...props}
        >
            {children}
        </VaulDrawer.Title>
    );
});

DrawerTitle.displayName = VaulDrawer.Title.displayName;
