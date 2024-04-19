import {Separator as RadixSeparator} from '@radix-ui/react-select';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';

import {composeClassName} from '@/utilities/styles';

/**
 * Used to visually separate items in the Select component.
 */
export const SelectPrimitiveSeparator = forwardRef<
    ElementRef<typeof RadixSeparator>,
    ComponentPropsWithoutRef<typeof RadixSeparator>
>(({
    children,
    className,
    ...props
}, ref) => (
    <RadixSeparator
        ref={ref}
        className={composeClassName(
            '-mx-1 my-1 h-px bg-muted',
            className,
        )}
        {...props}
    >
        {children}
    </RadixSeparator>
));

SelectPrimitiveSeparator.displayName = 'SelectPrimitiveSeparator';

