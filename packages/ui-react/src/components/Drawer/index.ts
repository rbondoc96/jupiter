import {Drawer as VaulDrawer} from 'vaul';
import {DrawerContent} from '@/components/Drawer/DrawerContent';
import {DrawerDescription} from '@/components/Drawer/DrawerDescription';
import {DrawerFooter} from '@/components/Drawer/DrawerFooter';
import {DrawerHeader} from '@/components/Drawer/DrawerHeader';
import {DrawerOverlay} from '@/components/Drawer/DrawerOverlay';
import {DrawerRoot} from '@/components/Drawer/DrawerRoot';
import {DrawerTitle} from '@/components/Drawer/DrawerTitle';

type DrawerComponent = typeof DrawerRoot & {
    Close: typeof VaulDrawer.Close;
    Content: typeof DrawerContent;
    Description: typeof DrawerDescription;
    Footer: typeof DrawerFooter;
    Header: typeof DrawerHeader;
    Overlay: typeof DrawerOverlay;
    Portal: typeof VaulDrawer.Portal;
    Title: typeof DrawerTitle;
    Trigger: typeof VaulDrawer.Trigger;
};

export const Drawer: DrawerComponent = Object.assign(DrawerRoot, {
    Close: VaulDrawer.Close,
    Content: DrawerContent,
    Description: DrawerDescription,
    Footer: DrawerFooter,
    Header: DrawerHeader,
    Overlay: DrawerOverlay,
    Portal: VaulDrawer.Portal,
    Title: DrawerTitle,
    Trigger: VaulDrawer.Trigger,
});
