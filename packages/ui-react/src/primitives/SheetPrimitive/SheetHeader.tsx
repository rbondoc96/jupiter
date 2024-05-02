import {type FunctionComponent, type HTMLAttributes} from 'react';
import {composeClassName} from '@/utilities/styles';

type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SheetHeader: FunctionComponent<SheetHeaderProps> = ({
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

SheetHeader.displayName = 'SheetHeader';