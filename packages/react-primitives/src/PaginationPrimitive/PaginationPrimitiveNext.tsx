import { Slot, Slottable } from '@radix-ui/react-slot';
import { type PropsWithChildren, type ReactNode } from 'react';

import { PaginationPrimitiveItem } from './PaginationPrimitiveItem';

type PaginationPrimitiveNextProps = {
    icon: ReactNode;
};

export function PaginationPrimitiveNext({
    children,
    icon,
}: PropsWithChildren<PaginationPrimitiveNextProps>): ReactNode {
    return (
        <PaginationPrimitiveItem>
            <Slot>
                <Slottable>{children}</Slottable>

                {icon}
            </Slot>
        </PaginationPrimitiveItem>
    );
}
