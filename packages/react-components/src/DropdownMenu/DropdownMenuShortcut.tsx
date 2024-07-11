import { composeClassName } from '@jupiter/web';
import { type FunctionComponent, type HTMLAttributes } from 'react';

type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const DropdownMenuShortcut: FunctionComponent<DropdownMenuShortcutProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <span className={composeClassName('ml-auto text-xs tracking-widest opacity-60', className)} {...props}>
            {children}
        </span>
    );
};
