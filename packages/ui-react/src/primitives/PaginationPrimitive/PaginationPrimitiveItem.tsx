import {forwardRef, type PropsWithChildren} from 'react';

import {composeClassName} from '@/utilities/styles';

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
