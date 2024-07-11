import { composeClassName } from '@jupiter/web';
import { Label as RadixLabel } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

/**
 * Used to label a group of options in the Select component.
 * 
 * Note: It won't be focusable using arrow keys.
 */
export const SelectPrimitiveGroupLabel = forwardRef<
    ElementRef<typeof RadixLabel>,
    ComponentPropsWithoutRef<typeof RadixLabel>
>(({
    children,
    className,
    ...props
}, ref) => (
    <RadixLabel
        ref={ref}
        className={composeClassName(
            'px-2 py-1.5 text-sm font-semibold',
            className,
        )}
        {...props}
    >
        {children}
    </RadixLabel>
));

SelectPrimitiveGroupLabel.displayName = 'SelectPrimitiveGroupLabel';
