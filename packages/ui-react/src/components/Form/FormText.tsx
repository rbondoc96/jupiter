import {type ReactNode} from 'react';
import {type ControllerProps, type FieldPath, type FieldValues} from 'react-hook-form';

import {FormFieldPrimitive, type FormFieldPrimitiveClassNames} from '@/primitives/FormFieldPrimitive';
import {composeClassName} from '@/utilities/styles';

export type FormTextClassNames = FormFieldPrimitiveClassNames & Partial<{
    input: string;
}>;

type FormTextProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    classNames?: FormTextClassNames;
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    label?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    placeholder?: string;
    type?: 'email' | 'text';
};

export function FormText<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    classNames,
    control,
    description,
    label,
    name,
    placeholder,
    type = 'text',
}: FormTextProps<TFieldValues, TName>): ReactNode {
    return (
        <FormFieldPrimitive
            classNames={{
                container: classNames?.container,
                description: classNames?.description,
                error: classNames?.error,
                label: classNames?.label,
            }}
            control={control}
            description={description}
            label={label}
            name={name}
        >
            {(field) => (
                <FormFieldPrimitive.Control>
                    <input
                        className={composeClassName(
                            'flex h-9 w-full px-3 py-1 shadow-sm transition-colors',
                            'border border-input rounded-md file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                            'text-sm file:text-sm file:font-medium placeholder:text-muted-foreground',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            classNames?.input,
                        )}
                        placeholder={placeholder}
                        type={type}
                        {...field}
                    />
                </FormFieldPrimitive.Control>
            )}
        </FormFieldPrimitive>
    );
}
