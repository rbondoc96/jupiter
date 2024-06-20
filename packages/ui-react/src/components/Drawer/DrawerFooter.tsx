import {composeClassName} from '@/utilities';
import {type HTMLAttributes, type ReactElement} from 'react';

type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;

export function DrawerFooter({
    children,
    className,
    ...props
}: DrawerFooterProps): ReactElement {
    return (
        <div
            className={composeClassName('mt-auto flex flex-col gap-2 p-4', className)}
            {...props}
        >
            {children}
        </div>
    );
}
DrawerFooter.displayName = 'DrawerFooter';
