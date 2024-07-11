import {createContext, type ReactNode, useContext, useId} from 'react';
import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    useFormContext,
} from 'react-hook-form';

type FormFieldPrimitiveProviderContextState<
    TValues extends FieldValues = FieldValues,
    TName extends FieldPath<TValues> = FieldPath<TValues>,
> = {
    id: string;
    name: TName;
};

export const FormFieldPrimitiveProviderContext = createContext<FormFieldPrimitiveProviderContextState | null>(null);

export function useFormFieldPrimitiveContext() {
    const context = useContext(FormFieldPrimitiveProviderContext);

    if (!context) {
        throw new Error('useFormField must be used within a FormFieldPrimitiveProvider');
    }

    const formContext = useFormContext();

    if (!formContext) {
        throw new Error('useFormField must be used within a FormFieldPrimitive');
    }

    const fieldState = formContext.getFieldState(context.name, formContext.formState);

    return {
        id: context.id,
        name: context.name,
        formItemId: `${context.id}-form-item`,
        formDescriptionId: `${context.id}-form-item-description`,
        formMessageId: `${context.id}-form-item-message`,
        ...fieldState,
    };
}

export function FormFieldPrimitiveProvider<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>): ReactNode {
    const id = useId();

    return (
        <FormFieldPrimitiveProviderContext.Provider value={{
            id,
            name: props.name,
        }}>
            <Controller {...props} />
        </FormFieldPrimitiveProviderContext.Provider>
    );
}
