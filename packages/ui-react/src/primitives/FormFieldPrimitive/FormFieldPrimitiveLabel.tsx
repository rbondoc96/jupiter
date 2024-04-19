import {Label} from '@radix-ui/react-label';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';

import {useFormFieldPrimitiveContext} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveProvider';
import {composeClassName} from '@/utilities/styles';

export const FormFieldPrimitiveLabel = forwardRef<
    ElementRef<typeof Label>,
    ComponentPropsWithoutRef<typeof Label>
>(({
    children,
    className,
    ...props
}, ref) => {
    const {error, formItemId} = useFormFieldPrimitiveContext();

    return (
        <Label
            className={composeClassName(
                'text-sm font-medium leading-none',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                error && 'text-destructive',
                className,
            )}
            htmlFor={formItemId}
            ref={ref}
            {...props}
        >
            {children}
        </Label>
    );
});

FormFieldPrimitiveLabel.displayName = 'FormFieldPrimitiveLabel';
