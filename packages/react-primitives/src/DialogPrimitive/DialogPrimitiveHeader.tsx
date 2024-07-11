import { composeClassName } from '@jupiter/web';
import { type FunctionComponent, type HTMLAttributes } from 'react';

type DialogPrimitiveHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogPrimitiveHeader: FunctionComponent<DialogPrimitiveHeaderProps> = ({
    children,
    className,
    ...props
}) => (
    <div
        className={composeClassName(
            'flex flex-col space-y-2 text-center sm:text-left',
            className,
        )}
        {...props}
    >
        {children}
    </div>
);

DialogPrimitiveHeader.displayName = 'DialogPrimitiveHeader';