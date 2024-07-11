import { SelectPrimitiveContent } from './SelectPrimitiveContent';
import { SelectPrimitiveGroup } from './SelectPrimitiveGroup';
import { SelectPrimitiveItem } from './SelectPrimitiveItem';
import { SelectPrimitiveRoot } from './SelectPrimitiveRoot';
import { SelectPrimitiveSeparator } from './SelectPrimitiveSeparator';
import { SelectPrimitiveTrigger } from './SelectPrimitiveTrigger';

export { type SelectPrimitiveContentClassNames } from './SelectPrimitiveContent';
export { type SelectPrimitiveItemClassNames } from './SelectPrimitiveItem';
export { type SelectPrimitiveTriggerClassNames } from './SelectPrimitiveTrigger';

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
