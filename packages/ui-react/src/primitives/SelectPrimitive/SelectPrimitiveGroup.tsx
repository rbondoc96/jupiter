import {Group} from '@radix-ui/react-select';

import {SelectPrimitiveGroupLabel} from '@/primitives/SelectPrimitive/SelectPrimitiveGroupLabel';

type SelectPrimitiveGroupComponent = typeof Group & {
    Label: typeof SelectPrimitiveGroupLabel;
};

export const SelectPrimitiveGroup: SelectPrimitiveGroupComponent = Object.assign(Group, {
    Label: SelectPrimitiveGroupLabel,
});
