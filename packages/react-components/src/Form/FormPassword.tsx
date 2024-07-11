import { type ReactNode, useId, useState } from 'react';
import { composeClassName } from '@jupiter/web';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { Checkbox, type CheckboxClassNames } from '../Checkbox';
import { FormFieldPrimitive, type FormFieldPrimitiveClassNames } from '@jupiter/react-primitives';

export type FormPasswordClassNames = FormFieldPrimitiveClassNames &
    Partial<{
        input: string;
        revealPassword: CheckboxClassNames;
        root: string;
    }>;

type FormPasswordProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    classNames?: FormPasswordClassNames;
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    label?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    placeholder?: string;
    revealPasswordLabel?: string;
};

export function FormPassword<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    classNames,
    control,
    description,
    label,
    name,
    placeholder,
    revealPasswordLabel = 'Reveal Password',
}: FormPasswordProps<TFieldValues, TName>): ReactNode {
    const [revealPassword, setRevealPassword] = useState(false);
    const id = useId();

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
                    <div className={composeClassName('flex flex-col gap-y-2', classNames?.root)}>
                        <input
                            className={composeClassName(
                                'flex h-9 w-full px-3 py-1 shadow-sm transition-colors',
                                'border border-input rounded-md file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                                'text-sm file:text-sm file:font-medium placeholder:text-muted-foreground',
                                'disabled:cursor-not-allowed disabled:opacity-50',
                                classNames?.input,
                            )}
                            placeholder={placeholder}
                            type={revealPassword ? 'text' : 'password'}
                            {...field}
                        />

                        <Checkbox
                            checked={revealPassword}
                            classNames={classNames?.revealPassword}
                            label={revealPasswordLabel}
                            name={`password-${id}`}
                            tabIndex={-1}
                            onChange={(checked) => setRevealPassword(checked === true)}
                        />
                    </div>
                </FormFieldPrimitive.Control>
            )}
        </FormFieldPrimitive>
    );
}
