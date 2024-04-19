import {Slot} from '@radix-ui/react-slot';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';

import {useFormFieldPrimitiveContext} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveProvider';

export const FormFieldPrimitiveControl = forwardRef<
    ElementRef<typeof Slot>,
    ComponentPropsWithoutRef<typeof Slot>
>(({
    children,
    ...props
}, ref) => {
    const {error, formItemId, formDescriptionId, formMessageId} = useFormFieldPrimitiveContext();

    return (
        <Slot
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            id={formItemId}
            ref={ref}
            {...props}
        >
            {children}
        </Slot>
    );
});

FormFieldPrimitiveControl.displayName = 'FormFieldPrimitiveControl';
