import { composeClassName } from '@jupiter/web';
import { forwardRef, type PropsWithChildren } from 'react';

type PaginationPrimitiveItemProps = {
    className?: string;
};

export const PaginationPrimitiveItem = forwardRef<HTMLLIElement, PropsWithChildren<PaginationPrimitiveItemProps>>(({
    className,
    children,
}, ref) => {
    return (
        <li
            ref={ref}
            className={composeClassName(
                'mx-auto flex w-full justify-center',
                className,
            )}
        >
            {children}
        </li>
    );
});

PaginationPrimitiveItem.displayName = 'PaginationPrimitiveItem';
