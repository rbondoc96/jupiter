import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ItemIndicator, RadioItem} from '@radix-ui/react-dropdown-menu';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {composeClassName} from '@/utilities/styles';

export const DropdownMenuRadioItem = forwardRef<
    ElementRef<typeof RadioItem>,
    ComponentPropsWithoutRef<typeof RadioItem>
>(({
    children,
    className,
    ...props
}, ref) => (
    <RadioItem
        ref={ref}
        className={composeClassName(
            'relative cursor-pointer select-none rounded-sm',
            'flex items-center',
            'py-1.5 pl-8 pr-2',
            'text-sm outline-none transition-colors',
            'focus:bg-accent focus:text-accent-foreground',
            'focus-visible:ring-0',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        )}
        {...props}
    >
        {children}
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ItemIndicator>
                <FontAwesomeIcon
                    icon={faCheck}
                    className="h-3 w-3 fill-current"
                />
            </ItemIndicator>
        </span>
    </RadioItem>
));

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';