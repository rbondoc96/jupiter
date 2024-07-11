import { composeClassName } from '@jupiter/web';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollDownButton as RadixScrollDownButton } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

export const SelectPrimitiveScrollDownButton = forwardRef<
    ElementRef<typeof RadixScrollDownButton>,
    ComponentPropsWithoutRef<typeof RadixScrollDownButton>
>(({
    className,
    ...props
}, ref) => (
    <RadixScrollDownButton
        ref={ref}
        className={composeClassName(
            'flex cursor-default items-center justify-center py-1',
            className,
        )}
        {...props}
    >
        <FontAwesomeIcon className="h-4 w-4 opacity-50" icon={faChevronDown} />
    </RadixScrollDownButton>
));

SelectPrimitiveScrollDownButton.displayName = 'SelectPrimitiveScrollDownButton';
