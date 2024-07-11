import { composeClassName } from '@jupiter/web';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon as RadixIcon, Trigger as RadixTrigger, Value as RadixValue } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export type SelectPrimitiveTriggerClassNames = Partial<{
    icon: string;
    root: string;
    value: string;
}>;

type SelectPrimitiveTriggerProps = {
    classNames?: SelectPrimitiveTriggerClassNames;
    hideIcon?: boolean;
    placeholder?: string;
} & Omit<ComponentPropsWithoutRef<typeof RadixTrigger>, 'className'>;

export const SelectPrimitiveTrigger = forwardRef<
    ElementRef<typeof RadixTrigger>,
    SelectPrimitiveTriggerProps
>(({
    classNames,
    children,
    hideIcon = false,
    placeholder,
    ...props
}, ref) => (
    <RadixTrigger
        className={composeClassName(
            'flex items-center justify-between',
            'h-9 w-full',
            'px-3 py-2',
            // 'bg-transparent shadow-sm',
            'bg-white shadow-sm',
            'ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'rounded-md border border-input',
            'text-sm placeholder:text-muted-foreground',
            'whitespace-nowrap',
            'focus:outline-none focus:ring-1 focus:ring-ring',
            '[&>span]:line-clamp-1',
            classNames?.root,
        )}
        ref={ref}
        {...props}
    >
        <RadixValue className={classNames?.value} placeholder={placeholder} />

        {children}

        {!hideIcon && (
            <RadixIcon asChild>
                <FontAwesomeIcon
                    className={composeClassName(
                        'h-4 w-4 opacity-50',
                        classNames?.icon,
                    )}
                    icon={faSort}
                />
            </RadixIcon>
        )}
    </RadixTrigger>
));

SelectPrimitiveTrigger.displayName = 'SelectPrimitiveTrigger';
