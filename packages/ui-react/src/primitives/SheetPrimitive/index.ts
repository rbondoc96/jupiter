import {
    Root as RadixRoot,
    Trigger as RadixTrigger,
} from '@radix-ui/react-dialog';

import {SheetPrimitiveContent} from '@/primitives/SheetPrimitive/SheetPrimitiveContent';
import {SheetPrimitiveDescription} from '@/primitives/SheetPrimitive/SheetPrimitiveDescription';
import {SheetPrimitiveFooter} from '@/primitives/SheetPrimitive/SheetPrimitiveFooter';
import {SheetPrimitiveHeader} from '@/primitives/SheetPrimitive/SheetPrimitiveHeader';
import {SheetPrimitiveOverlay} from '@/primitives/SheetPrimitive/SheetPrimitiveOverlay';
import {SheetPrimitiveTitle} from '@/primitives/SheetPrimitive/SheetPrimitiveTitle';

type SheetPrimitiveComponent = typeof RadixRoot & {
    Content: typeof SheetPrimitiveContent;
    Description: typeof SheetPrimitiveDescription;
    Footer: typeof SheetPrimitiveFooter;
    Header: typeof SheetPrimitiveHeader;
    Overlay: typeof SheetPrimitiveOverlay;
    Title: typeof SheetPrimitiveTitle;
    Trigger: typeof RadixTrigger;
};

export const SheetPrimitive: SheetPrimitiveComponent = Object.assign(RadixRoot, {
    Content: SheetPrimitiveContent,
    Description: SheetPrimitiveDescription,
    Footer: SheetPrimitiveFooter,
    Header: SheetPrimitiveHeader,
    Overlay: SheetPrimitiveOverlay,
    Title: SheetPrimitiveTitle,
    Trigger: RadixTrigger,
});
