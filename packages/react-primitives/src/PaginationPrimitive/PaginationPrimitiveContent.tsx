import { composeClassName } from '@jupiter/web';
import { forwardRef, type PropsWithChildren } from 'react';

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
