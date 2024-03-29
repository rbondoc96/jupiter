import {faMoon, faSun} from '@fortawesome/free-regular-svg-icons';
import {faComputer} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {composeClassName, DropdownMenu} from '@jupiter/ui-react';
import {type FunctionComponent} from 'react';
import {AppTheme} from '@/enums/AppTheme';
import {useAppTheme, useSetAppTheme} from '@/hooks/stores/useLocalStore';

export const ThemeToggle: FunctionComponent = () => {
    const appTheme = useAppTheme();
    const setAppTheme = useSetAppTheme();

    const icon = appTheme === AppTheme.System
        ? faComputer
        : appTheme === AppTheme.Dark
            ? faMoon
            : faSun;
    
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                className={composeClassName(
                    'border-2 rounded-3xl',
                    'border-slate-300 hover:border-slate-800 dark:border-slate-800 dark:hover:border-slate-300',
                    'px-4 py-2.5',
                    'shadow-lg',
                )}
            >
                <FontAwesomeIcon
                    fixedWidth
                    icon={icon}
                    className="text-black dark:text-white"
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.RadioGroup
                    className={composeClassName(
                        'flex flex-col',
                    )}
                    value={appTheme}
                    onValueChange={value => setAppTheme(value as AppTheme)}
                >
                    <DropdownMenu.RadioItem
                        className={composeClassName(
                            'flex',
                        )}
                        value={AppTheme.Dark}
                    >
                        Dark
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.Separator />
                    <DropdownMenu.RadioItem
                        className={composeClassName(
                            'flex',
                        )}
                        value={AppTheme.Light}
                    >
                        Light
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.Separator />
                    <DropdownMenu.RadioItem
                        className={composeClassName(
                            'flex',
                        )}
                        value={AppTheme.System}
                    >
                        System
                    </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
