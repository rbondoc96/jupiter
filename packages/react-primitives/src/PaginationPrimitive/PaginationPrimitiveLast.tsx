import { Slot, Slottable } from '@radix-ui/react-slot';
import { type PropsWithChildren, type ReactNode } from 'react';

import { PaginationPrimitiveItem } from './PaginationPrimitiveItem';

type PaginationPrimitiveLastProps = {
    icon: ReactNode;
};

export function PaginationPrimitiveLast({
    children,
    icon,
}: PropsWithChildren<PaginationPrimitiveLastProps>): ReactNode {
    return (
        <PaginationPrimitiveItem>
            <Slot>
                <Slottable>{children}</Slottable>

                {icon}
            </Slot>
        </PaginationPrimitiveItem>
    );
}
