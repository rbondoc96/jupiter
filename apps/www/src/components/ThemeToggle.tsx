import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FunctionComponent, useEffect } from 'react';

import { DropdownMenu } from '@jupiter/react-components';

import { AppTheme } from '@/enums/AppTheme';
import { useAppTheme, useSetAppTheme } from '@/hooks/stores/useLocalStore';
import { applyAppTheme } from '@/utilities/theme';

export const ThemeToggle: FunctionComponent = () => {
    const appTheme = useAppTheme();
    const setAppTheme = useSetAppTheme();

    const icon = appTheme === AppTheme.System ? faComputer : appTheme === AppTheme.Dark ? faMoon : faSun;

    useEffect(() => {
        applyAppTheme(appTheme);
    }, [appTheme]);

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="theme-toggle-trigger">
                <FontAwesomeIcon fixedWidth icon={icon} className="icon" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.RadioGroup
                    className="theme-toggle-dropdown-container"
                    value={appTheme}
                    onValueChange={(value) => setAppTheme(value as AppTheme)}
                >
                    <DropdownMenu.RadioItem className="item" value={AppTheme.Dark}>
                        Dark
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.Separator />
                    <DropdownMenu.RadioItem className="item" value={AppTheme.Light}>
                        Light
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.Separator />
                    <DropdownMenu.RadioItem className="item" value={AppTheme.System}>
                        System
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
