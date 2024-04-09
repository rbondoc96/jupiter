import {forwardRef, type JSX} from 'react';

import {FormField, type FormFieldProps} from '@/components/FormField';

type FormInputNumberProps = {
    type: 'number';
    value?: number;
    onChange?: (value: number) => void;
};

type FormInputTextProps = {
    type: 'text' | 'email' | 'password',
    value?: string,
    onChange?: (value: string) => void,
};

type FormInputProps = {
    className?: string;
    disabled?: boolean;
    name: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: JSX.IntrinsicElements['input']['tabIndex'];
    type: 'email' | 'number' | 'password' | 'text';
} & (FormInputNumberProps | FormInputTextProps) & FormFieldProps;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    className,
    disabled,
    label,
    name,
    placeholder,
    readOnly,
    required,
    tabIndex,
    type,
    value,
    onChange,
}, ref) => {
    return (
        <FormField label={label}>
            <input
                className={className}
                disabled={disabled || readOnly}
                id={name}
                name={name}
                placeholder={placeholder}
                readOnly={readOnly}
                ref={ref}
                required={required}
                tabIndex={tabIndex}
                // Explicitly prevent the number type.
                // This will make it easier to handle different types of numeric values.
                type={type === 'number' ? 'text' : type}
                value={value}
                onChange={event => {
                    const value = event.currentTarget.value;

                    if (type !== 'number') {
                        onChange?.(value);
                        return;
                    }

                    const numberValue = Number(value);

                    if (Number.isNaN(numberValue)) {
                        throw new Error(`Invalid number value: ${value}`);
                    }

                    onChange?.(Number(value));
                }}
            />
        </FormField>
    );
});

FormInput.displayName = 'FormInput';
