import { composeClassName } from '@jupiter/web';
import { type PropsWithChildren, type ReactNode } from 'react';

type PaginationPrimitiveRootProps = {
    'aria-label'?: string;
    className?: string;
};

export function PaginationPrimitiveRoot({
    className,
    children,
    ...props
}: PropsWithChildren<PaginationPrimitiveRootProps>): ReactNode {
    return (
        <nav
            aria-label={props['aria-label'] ?? 'pagination'}
            role="navigation"
            className={composeClassName(
                'mx-auto flex w-full justify-center',
                className,
            )}
        >
            {children}
        </nav>
    );
}
