import { composeClassName } from '@jupiter/web';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollUpButton as RadixScrollUpButton } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const SelectScrollUpButton = forwardRef<
    ElementRef<typeof RadixScrollUpButton>,
    ComponentPropsWithoutRef<typeof RadixScrollUpButton>
>(({
    className,
    ...props
}, ref) => (
    <RadixScrollUpButton
        ref={ref}
        className={composeClassName(
            'flex cursor-default items-center justify-center py-1',
            className,
        )}
        {...props}
    >
        <FontAwesomeIcon className="h-4 w-4 opacity-50" icon={faChevronUp} />
    </RadixScrollUpButton>
));

SelectScrollUpButton.displayName = 'SelectScrollUpButton';
