import {type FunctionComponent, type PropsWithChildren} from 'react';

export type FormFieldProps = {
    label?: string;
};

export const FormField: FunctionComponent<PropsWithChildren<FormFieldProps>> = ({
    children,
    label,
}) => {
    return (
        <div>
            {label && (
                <span>
                    {label}
                </span>
            )}

            {children}
        </div>
    );
};
