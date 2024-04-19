import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Item as RadixItem,
    ItemIndicator as RadixItemIndicator,
    ItemText as RadixItemText,
} from '@radix-ui/react-select';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';

import {composeClassName} from '@/utilities/styles';

export type SelectPrimitiveItemClassNames = Partial<{
    icon: string;
    root: string;
    text: string;
}>;

type SelectPrimitiveItemsProps = Omit<ComponentPropsWithoutRef<typeof RadixItem>, 'className'> & {
    classNames?: SelectPrimitiveItemClassNames;
};

export const SelectPrimitiveItem = forwardRef<
    ElementRef<typeof RadixItem>,
    SelectPrimitiveItemsProps
>(({
    classNames,
    children,
    ...props
}, ref) => (
    <RadixItem
        ref={ref}
        className={composeClassName(
            'relative flex items-center',
            'w-full',
            'cursor-default select-none',
            'rounded-sm',
            'py-1.5 pl-2 pr-8',
            'text-sm',
            'outline-none',
            'focus:bg-accent focus:text-accent-foreground',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            classNames?.root,
        )}
        {...props}
    >
        <RadixItemIndicator
            className={composeClassName(
                'absolute right-2',
                'flex items-center justify-center',
                'h-3.5 w-3.5 ',
            )}
        >
            <FontAwesomeIcon
                className={composeClassName(
                    'h-4 w-4',
                    classNames?.icon,
                )}
                icon={faCheck}
            />
        </RadixItemIndicator>

        <RadixItemText className={classNames?.text}>
            {children}
        </RadixItemText>
    </RadixItem>
));

SelectPrimitiveItem.displayName = 'SelectPrimitiveItem';
