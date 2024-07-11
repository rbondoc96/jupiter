import { DialogPrimitive } from '@jupiter/react-primitives';
import { useMediaQuery } from '@uidotdev/usehooks';
import { type ReactElement, useState } from 'react';

import { Drawer } from './Drawer';

type ResponsiveDialogProps = {
    className: string;
};

export function ResponsiveDialog({ className }: ResponsiveDialogProps): ReactElement {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('only screen and (min-width: 768px)');

    if (isDesktop) {
        return (
            <DialogPrimitive open={open} onOpenChange={setOpen}>
                <DialogPrimitive.Trigger>Open Dialog</DialogPrimitive.Trigger>

                <DialogPrimitive.Content side="center">
                    <DialogPrimitive.Header>
                        <DialogPrimitive.Title>This Dialog Title</DialogPrimitive.Title>
                        <DialogPrimitive.Description>This is the dialog description.</DialogPrimitive.Description>
                    </DialogPrimitive.Header>

                    <div>Div between header and footer</div>

                    <DialogPrimitive.Footer>
                        <div>This is the dialog footer</div>
                        <DialogPrimitive.Close>Close Dialog</DialogPrimitive.Close>
                    </DialogPrimitive.Footer>
                </DialogPrimitive.Content>
            </DialogPrimitive>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>Open Drawer</Drawer.Trigger>

            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>

                    <Drawer.Description>Drawer Description</Drawer.Description>
                </Drawer.Header>

                <div>Div between header and footer</div>

                <Drawer.Footer>
                    <div>Drawer Footer</div>
                    <Drawer.Close>Closer Drawer</Drawer.Close>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    );
}
