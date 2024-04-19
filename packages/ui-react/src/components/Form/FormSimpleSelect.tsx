import {type ReactNode} from 'react';
import {type ControllerProps, type FieldPath, type FieldValues} from 'react-hook-form';

import {FormFieldPrimitive, type FormFieldPrimitiveClassNames} from '@/primitives/FormFieldPrimitive';
import {SelectPrimitive,
    type SelectPrimitiveContentClassNames,
    type SelectPrimitiveItemClassNames,
    type SelectPrimitiveTriggerClassNames,
} from '@/primitives/SelectPrimitive';

export type FormSimpleSelectOption<TValue extends string> = {
    label: string;
    value: TValue;
};

export type FormSimpleSelectClassNames = Partial<{
    content: SelectPrimitiveContentClassNames;
    item: SelectPrimitiveItemClassNames;
    trigger: SelectPrimitiveTriggerClassNames;
    root: FormFieldPrimitiveClassNames;
}>;

type FormSimpleSelectProps<
    TValue extends string,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    classNames?: FormSimpleSelectClassNames;
    control: ControllerProps<TFieldValues, TName>['control'];
    defaultOpen?: boolean;
    description?: string;
    hideIcon?: boolean;
    label?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    open?: boolean;
    options: readonly FormSimpleSelectOption<TValue>[];
    placeholder?: string;
};

export function FormSimpleSelect<
    TValue extends string,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    classNames,
    control,
    defaultOpen,
    description,
    hideIcon = false,
    label,
    name,
    open,
    options,
    placeholder,
}: FormSimpleSelectProps<TValue, TFieldValues, TName>): ReactNode {
    return (
        <FormFieldPrimitive
            classNames={classNames?.root}
            control={control}
            description={description}
            label={label}
            name={name}
        >
            {field => (
                <SelectPrimitive
                    defaultOpen={defaultOpen}
                    defaultValue={field.value}
                    open={open}
                    onValueChange={field.onChange}
                >
                    <FormFieldPrimitive.Control>
                        <SelectPrimitive.Trigger
                            classNames={classNames?.trigger}
                            hideIcon={hideIcon}
                            placeholder={placeholder}
                        />
                    </FormFieldPrimitive.Control>
                    <SelectPrimitive.Content classNames={classNames?.content}>
                        {options.map(option => (
                            <SelectPrimitive.Content.Item
                                key={`form-simple-select-option-${option.value}`}
                                classNames={classNames?.item}
                                value={option.value}
                            >
                                {option.label}
                            </SelectPrimitive.Content.Item>
                        ))}
                    </SelectPrimitive.Content>
                </SelectPrimitive>
            )}
        </FormFieldPrimitive>
    );
}
