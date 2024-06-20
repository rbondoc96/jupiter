import {type ComponentProps, type ReactElement} from 'react';
import {Drawer as VaulDrawer} from 'vaul';

type DrawerRootProps = ComponentProps<typeof VaulDrawer.Root>;

export function DrawerRoot({
    children,
    shouldScaleBackground,
    ...props
}: DrawerRootProps): ReactElement {
    return (
        <VaulDrawer.Root
            shouldScaleBackground={shouldScaleBackground}
            {...props}
        >
            {children}
        </VaulDrawer.Root>
    );
}
