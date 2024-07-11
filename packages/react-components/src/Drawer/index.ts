import {Drawer as VaulDrawer} from 'vaul';

import {DrawerContent} from './DrawerContent';
import {DrawerDescription} from './DrawerDescription';
import {DrawerFooter} from './DrawerFooter';
import {DrawerHeader} from './DrawerHeader';
import {DrawerOverlay} from './DrawerOverlay';
import {DrawerRoot} from './DrawerRoot';
import {DrawerTitle} from './DrawerTitle';

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
