import {forwardRef, type JSX} from 'react';

import {useFormFieldPrimitiveContext} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveProvider';
import {composeClassName} from '@/utilities/styles';

export const FormFieldPrimitiveDescription = forwardRef<
    HTMLParagraphElement,
    JSX.IntrinsicElements['p']
>(({
    children,
    className,
    ...props
}, ref) => {
    const {formDescriptionId} = useFormFieldPrimitiveContext();

    return (
        <p
            className={composeClassName(
                'text-[0.8rem] text-muted-foreground',
                className,
            )}
            id={formDescriptionId}
            ref={ref}
            {...props}
        >
            {children}
        </p>
    );
});

FormFieldPrimitiveDescription.displayName = 'FormFieldPrimitiveDescription';
