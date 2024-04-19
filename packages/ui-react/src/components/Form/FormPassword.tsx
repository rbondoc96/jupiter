import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {type ReactNode, useState} from 'react';
import {type ControllerProps, type FieldPath, type FieldValues} from 'react-hook-form';

import {FormFieldPrimitive, type FormFieldPrimitiveClassNames} from '@/primitives/FormFieldPrimitive';
import {Button} from '@/components/Button';
import {composeClassName} from '@/utilities/styles';

export type FormPasswordClassNames = FormFieldPrimitiveClassNames & Partial<{
    input: string;
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
}: FormPasswordProps<TFieldValues, TName>): ReactNode {
    const [revealPassword, setRevealPassword] = useState(false);

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
                    <div className="relative">
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

                        <div className="absolute top-0 right-0 translate-y-1/4">
                            <div className="mr-2">
                                <Button
                                    variant="unstyled"
                                    onClick={() => setRevealPassword(revealed => !revealed)}
                                >
                                    {revealPassword ? (
                                        <FontAwesomeIcon
                                            icon={faEyeSlash}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faEye}
                                        />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </FormFieldPrimitive.Control>
            )}
        </FormFieldPrimitive>
    );
}
