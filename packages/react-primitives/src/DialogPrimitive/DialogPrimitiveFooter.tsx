import { composeClassName } from '@jupiter/web';
import { type FunctionComponent, type HTMLAttributes } from 'react';

type DialogPrimitiveFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogPrimitiveFooter: FunctionComponent<DialogPrimitiveFooterProps> = ({
    children,
    className,
    ...props
}) => (
    <div
        className={composeClassName(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            className,
        )}
        {...props}
    >
        {children}
    </div>
);

DialogPrimitiveFooter.displayName = 'DialogPrimitiveFooter';
