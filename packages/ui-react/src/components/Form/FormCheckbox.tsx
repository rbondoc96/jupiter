import {type ReactNode} from 'react';
import {type ControllerProps, type FieldPath, type FieldValues} from 'react-hook-form';

import {Checkbox} from '@/components/Checkbox';
import {FormFieldPrimitive, type FormFieldPrimitiveClassNames} from '@/primitives/FormFieldPrimitive';
import {composeClassName} from '@/utilities/styles';

export type FormCheckboxClassnames = FormFieldPrimitiveClassNames & Partial<{
    root: string;
}>;

type FormCheckboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    classNames?: FormCheckboxClassnames;
    control: ControllerProps<TFieldValues, TName>['control'];
    disabled?: boolean;
    label: string;
    name: ControllerProps<TFieldValues, TName>['name'];
};

export function FormCheckbox<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    classNames,
    control,
    disabled = false,
    label,
    name,
}: FormCheckboxProps<TFieldValues, TName>): ReactNode {
    return (
        <FormFieldPrimitive
            classNames={{
                container: classNames?.container,
                description: classNames?.description,
                error: classNames?.error,
                label: classNames?.label,
            }}
            control={control}
            name={name}
        >
            {(field) => (
                <div
                    className={composeClassName(
                        classNames?.root,
                    )}
                >
                    <FormFieldPrimitive.Control>
                        <Checkbox
                            checked={field.value}
                            disabled={disabled}
                            label={label}
                            name={field.name}
                            onChange={field.onChange}
                        />
                    </FormFieldPrimitive.Control>
                </div>
            )}
        </FormFieldPrimitive>
    );
}
