import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {SubTrigger} from '@radix-ui/react-dropdown-menu';
import {type ComponentPropsWithoutRef, type ElementRef, forwardRef} from 'react';
import {composeClassName} from '@/utilities/styles';

export const DropdownMenuSubTrigger = forwardRef<
    ElementRef<typeof SubTrigger>,
    ComponentPropsWithoutRef<typeof SubTrigger> & {inset?: boolean}
>(({
    children,
    className,
    inset,
    ...props
}, ref) => (
    <SubTrigger
        ref={ref}
        className={composeClassName(
            'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
            inset && 'pl-8',
            className,
        )}
        {...props}
    >
        {children}
        
        <FontAwesomeIcon
            icon={faChevronRight}
            className="ml-auto h-4 w-4"
        />
    </SubTrigger>
));

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

