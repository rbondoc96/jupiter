import { composeClassName } from '@jupiter/web';
import { forwardRef, type JSX } from 'react';

import { useFormFieldPrimitiveContext } from './FormFieldPrimitiveProvider';

export const FormFieldPrimitiveError = forwardRef<
    HTMLParagraphElement,
    Omit<JSX.IntrinsicElements['p'], 'children' | 'ref'>
>(({ className, ...props }, ref) => {
    const { error, formMessageId } = useFormFieldPrimitiveContext();
    const body = error ? String(error?.message) : null;

    if (!body) {
        return null;
    }

    return (
        <p
            className={composeClassName('text-[0.8rem] font-medium text-destructive', className)}
            id={formMessageId}
            ref={ref}
            {...props}
        >
            {body}
        </p>
    );
});

FormFieldPrimitiveError.displayName = 'FormFieldPrimitiveError';
