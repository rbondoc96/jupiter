import {faMoon, faSun} from '@fortawesome/free-regular-svg-icons';
import FontAwesomeIcon from 'solid-fa';
import {type Component, createSignal, Show} from 'solid-js';

import {setTheme, useLocalStore} from '@/stores/local.store';

const ThemeToggle: Component = () => {
    const localStore = useLocalStore();

    const [isDarkMode, setIsDarkMode] = createSignal(localStore.theme === 'dark');

    const toggleDarkMode = () => {
        setIsDarkMode(isCurrentlyDarkMode => {
            setTheme(isCurrentlyDarkMode ? 'light' : 'dark');
            return !isCurrentlyDarkMode;
        });
    };
    
    return (
        <button
            // eslint-disable-next-line max-len
            class="rounded-3xl px-4 py-2.5 shadow-lg border-2 border-slate-300 dark:border-slate-800"
            onClick={toggleDarkMode}
        >
            <div class="flex items-center justify-center">
                <Show
                    when={isDarkMode()}
                    fallback={(
                        <FontAwesomeIcon
                            fw
                            class="text-black dark:text-white"
                            icon={faSun}
                        />
                    )}
                >
                    <FontAwesomeIcon
                        fw
                        class="text-black dark:text-white"
                        icon={faMoon}
                    />
                </Show>
            </div>
        </button>   
    );
};

export default ThemeToggle;
