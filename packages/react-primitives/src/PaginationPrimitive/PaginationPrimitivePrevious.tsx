import { Slot, Slottable } from '@radix-ui/react-slot';
import { type PropsWithChildren, type ReactNode } from 'react';

import { PaginationPrimitiveItem } from './PaginationPrimitiveItem';

type PaginationPrimitivePreviousProps = {
    icon: ReactNode;
};

export function PaginationPrimitivePrevious({
    children,
    icon,
}: PropsWithChildren<PaginationPrimitivePreviousProps>): ReactNode {
    return (
        <PaginationPrimitiveItem>
            <Slot>
                {icon}

                <Slottable>{children}</Slottable>
            </Slot>
        </PaginationPrimitiveItem>
    );
}
