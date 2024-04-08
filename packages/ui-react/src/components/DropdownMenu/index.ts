import {
    Group,
    Portal,
    RadioGroup,
    Root,
    Sub,
    Trigger,
} from '@radix-ui/react-dropdown-menu';

import {DropdownMenuCheckboxItem} from './DropdownMenuCheckboxItem';
import {DropdownMenuContent} from './DropdownMenuContent';
import {DropdownMenuItem} from './DropdownMenuItem';
import {DropdownMenuLabel} from './DropdownMenuLabel';
import {DropdownMenuRadioItem} from './DropdownMenuRadioItem';
import {DropdownMenuSeparator} from './DropdownMenuSeparator';
import {DropdownMenuShortcut} from './DropdownMenuShortcut';
import {DropdownMenuSubContent} from './DropdownMenuSubContent';
import {DropdownMenuSubTrigger} from './DropdownMenuSubTrigger';

type DropdownMenuComponentMap = {
    CheckboxItem: typeof DropdownMenuCheckboxItem;
    /**
     * The component that pops out when the dropdown menu is open.
     * 
     * Background styles are governed by the `popover` and `popover-foreground` color tokens.
     * 
     * A wrapper around RadixUI's `DropdownMenu.Content` component.
     */
    Content: typeof DropdownMenuContent;
    Group: typeof Group;
    Item: typeof DropdownMenuItem;
    Label: typeof DropdownMenuLabel;
    Portal: typeof Portal;
    /**
     * Used to group multiple `RadioItem` components together.
     */
    RadioGroup: typeof RadioGroup;
    /**
     * An item that can be controlled and rendered like an `<input type="radio">` element.
     * 
     * Must be a child of a `RadioGroup` component.
     * 
     * Focus styles are governed by the `accent` and `accent-foreground` color tokens.
     * 
     * A wrapper around RadixUI's `DropdownMenu.RadioItem` component.
     */
    RadioItem: typeof DropdownMenuRadioItem;
    Root: typeof Root;
    /**
     * Used to visually separate items in the dropdown menu.
     * 
     * Its background color is governed by the `muted` color token.
     */
    Separator: typeof DropdownMenuSeparator;
    Shortcut: typeof DropdownMenuShortcut;
    Sub: typeof Sub;
    SubContent: typeof DropdownMenuSubContent;
    SubTrigger: typeof DropdownMenuSubTrigger;
    Trigger: typeof Trigger;
};

export const DropdownMenu = Object.assign<Record<string, never>, DropdownMenuComponentMap>({}, {
    CheckboxItem: DropdownMenuCheckboxItem,
    Content: DropdownMenuContent,
    Group,
    Item: DropdownMenuItem,
    Label: DropdownMenuLabel,
    Portal,
    RadioGroup,
    RadioItem: DropdownMenuRadioItem,
    Root,
    Separator: DropdownMenuSeparator,
    Shortcut: DropdownMenuShortcut,
    Sub,
    SubContent: DropdownMenuSubContent,
    SubTrigger: DropdownMenuSubTrigger,
    Trigger,
});
