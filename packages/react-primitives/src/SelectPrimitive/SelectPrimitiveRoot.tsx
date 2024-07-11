import { Root as RadixSelect } from '@radix-ui/react-select';
import { type FunctionComponent, type PropsWithChildren } from 'react';

type SelectPrimitiveProps = {
    defaultOpen?: boolean;
    defaultValue?: string;
    open?: boolean;
    onValueChange: (value: string) => void;
};

export const SelectPrimitiveRoot: FunctionComponent<PropsWithChildren<SelectPrimitiveProps>> = ({
    children,
    defaultOpen,
    defaultValue,
    open,
    onValueChange,
}) => {
    return (
        <RadixSelect
            defaultOpen={defaultOpen}
            defaultValue={defaultValue}
            open={open}
            onValueChange={onValueChange}
        >
            {children}
        </RadixSelect>
    );
};
