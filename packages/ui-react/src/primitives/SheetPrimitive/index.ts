import {
    Root as RadixRoot,
    Trigger as RadixTrigger,
} from '@radix-ui/react-dialog';

import {SheetContent} from '@/primitives/SheetPrimitive/SheetContent';
import {SheetDescription} from '@/primitives/SheetPrimitive/SheetDescription';
import {SheetFooter} from '@/primitives/SheetPrimitive/SheetFooter';
import {SheetHeader} from '@/primitives/SheetPrimitive/SheetHeader';
import {SheetOverlay} from '@/primitives/SheetPrimitive/SheetOverlay';
import {SheetTitle} from '@/primitives/SheetPrimitive/SheetTitle';

type SheetPrimitiveComponent = typeof RadixRoot & {
    Content: typeof SheetContent;
    Description: typeof SheetDescription;
    Footer: typeof SheetFooter;
    Header: typeof SheetHeader;
    Overlay: typeof SheetOverlay;
    Title: typeof SheetTitle;
    Trigger: typeof RadixTrigger;
};

export const SheetPrimitive: SheetPrimitiveComponent = Object.assign(RadixRoot, {
    Content: SheetContent,
    Description: SheetDescription,
    Footer: SheetFooter,
    Header: SheetHeader,
    Overlay: SheetOverlay,
    Title: SheetTitle,
    Trigger: RadixTrigger,
});
