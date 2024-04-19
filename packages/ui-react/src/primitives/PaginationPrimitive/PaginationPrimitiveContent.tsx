import {forwardRef, type PropsWithChildren} from 'react';

import {composeClassName} from '@/utilities/styles';

type PaginationPrimitiveContentProps = {
    className?: string;
};

export const PaginationPrimitiveContent = forwardRef<HTMLUListElement, PropsWithChildren<PaginationPrimitiveContentProps>>(({
    className,
    children,
}, ref) => {
    return (
        <ul
            ref={ref}
            className={composeClassName(
                'mx-auto flex w-full justify-center',
                className,
            )}
        >
            {children}
        </ul>
    );
});

PaginationPrimitiveContent.displayName = 'PaginationPrimitiveContent';
