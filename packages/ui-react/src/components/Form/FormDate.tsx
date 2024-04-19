import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useMask} from '@react-input/mask';
import {DateTime} from 'luxon';
import {type ReactNode, useRef, useState} from 'react';
import {type ControllerProps, type FieldPath, type FieldValues} from 'react-hook-form';

import {Calendar} from '@/components/Calendar';
import {FormFieldPrimitive, type FormFieldPrimitiveClassNames} from '@/primitives/FormFieldPrimitive';
import {DateTimeFormat} from '@/lib/enums/DateTimeFormat';
import {PopoverPrimitive} from '@/primitives/PopoverPrimitive';
import {composeClassName} from '@/utilities/styles';

export type FormDateClassNames = FormFieldPrimitiveClassNames & Partial<{
    triggerContainer: string;
}>;

type FormDateProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    classNames?: FormDateClassNames;
    control: ControllerProps<TFieldValues, TName>['control'];
    description?: string;
    format?: DateTimeFormat;
    fromDate?: Date;
    label?: string;
    name: ControllerProps<TFieldValues, TName>['name'];
    placeholder?: string;
    toDate?: Date;
};

export function FormDate<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    classNames,
    control,
    description,
    fromDate,
    label,
    name,
    placeholder,
    toDate,
}: FormDateProps<TFieldValues, TName>): ReactNode {
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const inputRef = useMask({
        mask: 'MM/DD/YYYY',
        replacement: {
            M: /\d/,
            D: /\d/,
            Y: /\d/,
        },
        showMask: true,
        // track: ({data, inputType, selectionEnd, selectionStart, value}) => {
        //     if (data === null) {
        //         return true;
        //     }

        //     if (Number.isNaN(data)) {
        //         return false;
        //     }

        //     // MM/DD/YYYY
        //     // 01/34/6789
        //     // 012_45_789 - `selectionStart` values
        //     if (selectionStart === selectionEnd) {
        //         if (selectionStart === 0) {
        //             if (data === '0' || data === '1') {
        //                 return true;
        //             }

        //             return `0${data};`
        //         }

        //         if (selectionStart === 1) {
        //             const firstDigit = value[0];

        //             if (firstDigit === '1' && !(data === '0' || data === '1' || data === '2')) {
        //                 return false;
        //             }

        //             return true;
        //         }
        //     }

        //     const parts = value.split('/');

        //     if (parts.length !== 3) {
        //         throw new Error('Invalid date format');
        //     }

        //     const month = parts[0]!;
        //     const day = parts[1]!;
        //     const year = parts[2]!;

        //     if () {

        //     }
            
        //     return data;
        // },
    });

    return(
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
                <PopoverPrimitive open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <FormFieldPrimitive.Control>
                        <div className="relative" ref={inputContainerRef}>
                            <PopoverPrimitive.Anchor>
                                <input
                                    type="text"
                                    ref={inputRef}
                                    className={composeClassName(
                                        'flex h-9 w-full px-3 py-1 shadow-sm transition-colors',
                                        'border border-input rounded-md file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                                        'text-sm file:text-sm file:font-medium placeholder:text-muted-foreground',
                                        'disabled:cursor-not-allowed disabled:opacity-50',
                                        !field.value && 'text-muted-foreground',
                                    )}
                                    placeholder={placeholder ?? 'MM/DD/YYYY'}
                                    value={field.value && (field.value as unknown) instanceof Date
                                        ? DateTime.fromJSDate(field.value).toFormat(DateTimeFormat.ShortPaddedDate)
                                        : field.value ?? ''
                                    }
                                    // Intentional no-op.
                                    // This is to prevent an error from React that occurs when
                                    // `defaultValue` or `value` is defined without an `onChange` handler.
                                    onChange={() => {}}
                                    onFocus={() => setIsCalendarOpen(true)}
                                />
                            </PopoverPrimitive.Anchor>

                            <div className="absolute top-0 right-0 translate-y-1/4">
                                <div className="mr-2">
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormFieldPrimitive.Control>

                    <PopoverPrimitive.Content
                        onCloseAutoFocus={event => event.preventDefault()}
                        onOpenAutoFocus={event => event.preventDefault()}
                        onInteractOutside={event => {
                            event.preventDefault();

                            if (!inputContainerRef.current?.contains(event.currentTarget as Node)) {
                                setIsCalendarOpen(false);
                            }
                        }}
                    >
                        <Calendar
                            mode="single"
                            fromDate={fromDate}
                            toDate={toDate}
                            selected={field.value}
                            onSelect={field.onChange}
                        />
                    </PopoverPrimitive.Content>
                </PopoverPrimitive>
            )}
        </FormFieldPrimitive>
    );
}
