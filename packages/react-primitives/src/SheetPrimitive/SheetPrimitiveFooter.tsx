import { composeClassName } from '@jupiter/web';
import { type FunctionComponent, type HTMLAttributes } from 'react';

type SheetPrimitiveFooterProps = HTMLAttributes<HTMLDivElement>;

export const SheetPrimitiveFooter: FunctionComponent<SheetPrimitiveFooterProps> = ({
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

SheetPrimitiveFooter.displayName = 'SheetPrimitiveFooter';
