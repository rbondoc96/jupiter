import {type FunctionComponent, type HTMLAttributes} from 'react';
import {composeClassName} from '@/utilities/styles';

type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogHeader: FunctionComponent<DialogHeaderProps> = ({
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

DialogHeader.displayName = 'DialogHeader';