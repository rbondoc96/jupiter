import {composeClassName} from '@/utilities';
import {type HTMLAttributes, type ReactElement} from 'react';

type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;

export function DrawerHeader({
    children,
    className,
    ...props
}: DrawerHeaderProps): ReactElement {
    return (
        <div
            className={composeClassName('grid gap-1.5 p-4 text-center sm:text-left', className)}
            {...props}
        >
            {children}
        </div>
    );
}
DrawerHeader.displayName = 'DrawerHeader';
