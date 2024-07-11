import {Close, Root, Trigger} from '@radix-ui/react-dialog';
import {DialogPrimitiveContent} from './DialogPrimitiveContent';
import {DialogPrimitiveDescription} from './DialogPrimitiveDescription';
import {DialogPrimitiveFooter} from './DialogPrimitiveFooter';
import {DialogPrimitiveHeader} from './DialogPrimitiveHeader';
import {DialogPrimitiveTitle} from './DialogPrimitiveTitle';

type DialogPrimitiveComponent = typeof Root & {
    Close: typeof Close;
    Content: typeof DialogPrimitiveContent;
    Description: typeof DialogPrimitiveDescription;
    Footer: typeof DialogPrimitiveFooter;
    Header: typeof DialogPrimitiveHeader;
    Root: typeof Root;
    Title: typeof DialogPrimitiveTitle;
    Trigger: typeof Trigger;
};

export const DialogPrimitive: DialogPrimitiveComponent = Object.assign(Root, {
    Close,
    Content: DialogPrimitiveContent,
    Description: DialogPrimitiveDescription,
    Footer: DialogPrimitiveFooter,
    Header: DialogPrimitiveHeader,
    Root,
    Title: DialogPrimitiveTitle,
    Trigger,
});
