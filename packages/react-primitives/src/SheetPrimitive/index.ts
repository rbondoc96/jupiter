import {
    Root as RadixRoot,
    Trigger as RadixTrigger,
} from '@radix-ui/react-dialog';

import { SheetPrimitiveContent } from './SheetPrimitiveContent';
import { SheetPrimitiveDescription } from './SheetPrimitiveDescription';
import { SheetPrimitiveFooter } from './SheetPrimitiveFooter';
import { SheetPrimitiveHeader } from './SheetPrimitiveHeader';
import { SheetPrimitiveOverlay } from './SheetPrimitiveOverlay';
import { SheetPrimitiveTitle } from './SheetPrimitiveTitle';

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
