import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { composeClassName } from '@jupiter/web';
import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const DropdownMenuCheckboxItem = forwardRef<
    ElementRef<typeof CheckboxItem>,
    ComponentPropsWithoutRef<typeof CheckboxItem>
>(({
    checked,
    children,
    className,
    ...props
}, ref) => (
    <CheckboxItem
        ref={ref}
        className={composeClassName(
            'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        )}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ItemIndicator>
                <FontAwesomeIcon
                    icon={faCheck}
                    className="h-4 w-4"
                />
            </ItemIndicator>
        </span>
        {children}
    </CheckboxItem>
));

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';