import {type FunctionComponent, type HTMLAttributes} from 'react';
import {composeClassName} from '@/utilities/styles';

type SheetFooterProps = HTMLAttributes<HTMLDivElement>;

export const SheetFooter: FunctionComponent<SheetFooterProps> = ({
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

SheetFooter.displayName = 'SheetFooter';
