import {type ReactElement, useState} from 'react';
import {Dialog, Drawer} from '@/components';
import {useMediaQuery} from '@/hooks';

type ResponsiveDialogProps = {
    className: string;
};

export function ResponsiveDialog({
    className,
}: ResponsiveDialogProps): ReactElement {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <Dialog.Trigger>
                    Open Dialog
                </Dialog.Trigger>

                <Dialog.Content side="center">
                    <Dialog.Header>
                        <Dialog.Title>This Dialog Title</Dialog.Title>
                        <Dialog.Description>
                            This is the dialog description.
                        </Dialog.Description>
                    </Dialog.Header>

                    <div>
                        Div between header and footer
                    </div>

                    <Dialog.Footer>
                        <div>
                            This is the dialog footer
                        </div>
                        <Dialog.Close>Close Dialog</Dialog.Close>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>
                Open Drawer
            </Drawer.Trigger>

            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>
                        Drawer Title
                    </Drawer.Title>

                    <Drawer.Description>
                        Drawer Description
                    </Drawer.Description>
                </Drawer.Header>

                <div>
                    Div between header and footer
                </div>

                <Drawer.Footer>
                    <div>
                        Drawer Footer
                    </div>
                    <Drawer.Close>
                        Closer Drawer
                    </Drawer.Close>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    );
}
