import {Close, Root, Trigger} from '@radix-ui/react-dialog';
import {DialogContent} from './DialogContent';
import {DialogDescription} from './DialogDescription';
import {DialogFooter} from './DialogFooter';
import {DialogHeader} from './DialogHeader';
import {DialogTitle} from './DialogTitle';

type DialogComponent = typeof Root & {
    Close: typeof Close;
    Content: typeof DialogContent;
    Description: typeof DialogDescription;
    Footer: typeof DialogFooter;
    Header: typeof DialogHeader;
    Root: typeof Root;
    Title: typeof DialogTitle;
    Trigger: typeof Trigger;
};

export const Dialog: DialogComponent = Object.assign(Root, {
    Close,
    Content: DialogContent,
    Description: DialogDescription,
    Footer: DialogFooter,
    Header: DialogHeader,
    Root,
    Title: DialogTitle,
    Trigger,
});
