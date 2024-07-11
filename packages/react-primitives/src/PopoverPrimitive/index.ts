import { Anchor as RadixAnchor, Root as RadixRoot, Trigger as RadixTrigger } from '@radix-ui/react-popover';

import { PopoverPrimitiveContent } from './PopoverPrimitiveContent';

type PopoverPrimitiveComponent = typeof RadixRoot & {
    /**
     * An optional element to position the PopoverPrimitive.Content against.
     *
     * If this part is not used, the content will position alongside the PopoverPrimitive.Trigger.
     */
    Anchor: typeof RadixAnchor;
    /**
     * The component that pops out when the popover is open.
     */
    Content: typeof PopoverPrimitiveContent;
    /**
     * The button that toggles the popover.
     *
     * By default, the PopoverPrimitive.Content will position itself against the trigger.
     */
    Trigger: typeof RadixTrigger;
};

export const PopoverPrimitive: PopoverPrimitiveComponent = Object.assign(RadixRoot, {
    Anchor: RadixAnchor,
    Content: PopoverPrimitiveContent,
    Trigger: RadixTrigger,
});
