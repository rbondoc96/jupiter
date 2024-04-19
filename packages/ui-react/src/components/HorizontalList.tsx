import {type PropsWithChildren, type ReactNode} from 'react';

import {composeClassName} from '@/utilities/styles';

type HorizontalListProps = {
    className?: string;
};

export function HorizontalList({
    children,
    className,
}: PropsWithChildren<HorizontalListProps>): ReactNode {
    return (
        <div
            className={composeClassName(
                'grid grid-flow-col auto-cols-[175px] gap-x-3',
                'py-3',
                'overflow-x-auto',
                className,
            )}
        >
            {children}
        </div>
    );
}
