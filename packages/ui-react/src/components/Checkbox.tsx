import {faCheck, faSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    type CheckedState,
    Indicator as RadixIndicator,
    Root as RadixRoot,
} from '@radix-ui/react-checkbox';
import {type FunctionComponent} from 'react';

import {composeClassName} from '@/utilities/styles';

export type FormCheckboxClassnames = Partial<{
    label: string;
    root: string;
    toggle: string;
}>;

type CheckboxProps = {
    checked?: CheckedState;
    classNames?: FormCheckboxClassnames;
    disabled?: boolean;
    label: string;
    name: string;
    value?: string;
    onChange: (checked: CheckedState) => void;
};

export const Checkbox: FunctionComponent<CheckboxProps> = ({
    checked,
    classNames,
    disabled = false,
    label,
    name,
    value,
    onChange,
}) => {
    return (
        <div
            className={composeClassName(
                'flex items-center gap-x-2',
                classNames?.root,
            )}
        >
            <RadixRoot
                defaultChecked="indeterminate"
                checked={checked}
                className={composeClassName(
                    'flex justify-center items-center',
                    'h-7 w-7',
                    'rounded-md',
                    'bg-white',
                    classNames?.toggle,
                )}
                disabled={disabled}
                id={name}
                name={name}
                value={value}
                onCheckedChange={onChange}
            >
                <RadixIndicator className="flex">
                    {checked === undefined || checked === 'indeterminate' ? (
                        <FontAwesomeIcon
                            className="h-3 w-3"
                            icon={faSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="h-3 w-3"
                            icon={faCheck}
                        />
                    )}
                </RadixIndicator>
            </RadixRoot>

            <label
                className={composeClassName(
                    classNames?.label,
                )}
                htmlFor={name}
            >
                {label}
            </label>
        </div>
    );
};

Checkbox.displayName = 'Checkbox';
