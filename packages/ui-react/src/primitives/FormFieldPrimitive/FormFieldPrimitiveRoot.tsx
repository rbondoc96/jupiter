import {type ReactNode} from 'react';
import {type ControllerProps, type FieldPath, type FieldValues} from 'react-hook-form';

import {FormFieldPrimitiveDescription} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveDescription';
import {FormFieldPrimitiveError} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveError';
import {FormFieldPrimitiveLabel} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveLabel';
import {FormFieldPrimitiveProvider} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveProvider';
import {composeClassName} from '@/utilities/styles';

export type FormFieldPrimitiveRootClassNames = Partial<{
    container: string;
    description: string;
    error: string;
    label: string;
    descriptionErrorContainer: string;
}>;

type FormFieldPrimitiveRootProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    children: (field: Parameters<ControllerProps<TFieldValues, TName>['render']>[0]['field']) => ReactNode;
    classNames?: FormFieldPrimitiveRootClassNames;
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    label?: string;
};

export function FormFieldPrimitiveRoot<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    children,
    classNames,
    control,
    description,
    label,
    name,
}: FormFieldPrimitiveRootProps<TFieldValues, TName>): ReactNode {
    return (
        <FormFieldPrimitiveProvider
            control={control}
            name={name}
            render={({field}) => (
                <div
                    className={composeClassName(
                        'flex flex-col gap-y-1',
                        classNames?.container,
                    )}
                >
                    {label && (
                        <FormFieldPrimitiveLabel className={classNames?.label}>
                            {label}
                        </FormFieldPrimitiveLabel>
                    )}

                    {children(field)}

                    <div
                        className={composeClassName(
                            'flex flex-col gap-y-px',
                            classNames?.descriptionErrorContainer,
                        )}
                    >
                        {description && (
                            <FormFieldPrimitiveDescription className={classNames?.description}>
                                {description}
                            </FormFieldPrimitiveDescription>
                        )}

                        <FormFieldPrimitiveError className={classNames?.error} />
                    </div>
                </div>
            )}
        />
    );
}
