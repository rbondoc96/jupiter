import {SelectPrimitiveContent} from '@/primitives/SelectPrimitive/SelectPrimitiveContent';
import {SelectPrimitiveGroup} from '@/primitives/SelectPrimitive/SelectPrimitiveGroup';
import {SelectPrimitiveItem} from '@/primitives/SelectPrimitive/SelectPrimitiveItem';
import {SelectPrimitiveRoot} from '@/primitives/SelectPrimitive/SelectPrimitiveRoot';
import {SelectPrimitiveSeparator} from '@/primitives/SelectPrimitive/SelectPrimitiveSeparator';
import {SelectPrimitiveTrigger} from '@/primitives/SelectPrimitive/SelectPrimitiveTrigger';

export {type SelectPrimitiveContentClassNames} from '@/primitives/SelectPrimitive/SelectPrimitiveContent';
export {type SelectPrimitiveItemClassNames} from '@/primitives/SelectPrimitive/SelectPrimitiveItem';
export {type SelectPrimitiveTriggerClassNames} from '@/primitives/SelectPrimitive/SelectPrimitiveTrigger';

type SelectPrimitiveComponent = typeof SelectPrimitiveRoot & {
    Content: typeof SelectPrimitiveContent & {
        Item: typeof SelectPrimitiveItem;
    };
    Group: typeof SelectPrimitiveGroup;
    /**
     * Used to visually separate items in the Select component.
     */
    Separator: typeof SelectPrimitiveSeparator;
    Trigger: typeof SelectPrimitiveTrigger;
};

export const SelectPrimitive: SelectPrimitiveComponent = Object.assign(SelectPrimitiveRoot, {
    Content: Object.assign(SelectPrimitiveContent, {
        Item: SelectPrimitiveItem,
    }),
    Group: SelectPrimitiveGroup,
    Separator: SelectPrimitiveSeparator,
    Trigger: SelectPrimitiveTrigger,
});
