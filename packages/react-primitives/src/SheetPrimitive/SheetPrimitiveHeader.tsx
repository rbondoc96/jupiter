import { composeClassName } from '@jupiter/web';
import { type FunctionComponent, type HTMLAttributes } from 'react';

type SheetPrimitiveHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SheetPrimitiveHeader: FunctionComponent<SheetPrimitiveHeaderProps> = ({
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

SheetPrimitiveHeader.displayName = 'SheetPrimitiveHeader';