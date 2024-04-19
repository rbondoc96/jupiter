import {Slot, Slottable} from '@radix-ui/react-slot';
import {type PropsWithChildren, type ReactNode} from 'react';

import {PaginationPrimitiveItem} from '@/primitives/PaginationPrimitive/PaginationPrimitiveItem';

type PaginationPrimitiveFirstProps = {
    icon: ReactNode;
};

export function PaginationPrimitiveFirst({
    children,
    icon,
}: PropsWithChildren<PaginationPrimitiveFirstProps>): ReactNode {
    return (
        <PaginationPrimitiveItem>
            <Slot>
                {icon}

                <Slottable>
                    {children}
                </Slottable>
            </Slot>
        </PaginationPrimitiveItem>
    );
}
