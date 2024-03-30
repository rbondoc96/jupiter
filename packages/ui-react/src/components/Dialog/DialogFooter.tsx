import {type FunctionComponent, type HTMLAttributes} from 'react';
import {composeClassName} from '@/utilities/styles';

type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogFooter: FunctionComponent<DialogFooterProps> = ({
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

DialogFooter.displayName = 'DialogFooter';
