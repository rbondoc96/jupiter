import {faMoon, faSun} from '@fortawesome/free-regular-svg-icons';
import FontAwesomeIcon from 'solid-fa';
import {type Component, Show} from 'solid-js';

import UITheme from '@/enums/UITheme';
import {useSetTheme, useTheme} from '@/stores/local.store';
import {TailwindStyles} from '@/utilities/tailwind';

const ThemeToggle: Component = () => {
    const setTheme = useSetTheme();
    const theme = useTheme();

    const styles = new TailwindStyles({
        border: 'border-2 rounded-3xl',
        borderColor:
            'border-slate-300 hover:border-slate-800 dark:border-slate-800 dark:hover:border-slate-300',
        layout: 'px-4 py-2.5',
        shadow: 'shadow-lg',
    });

    const isDarkMode = () => theme() === UITheme.Dark;

    const toggleDarkMode = () => {
        setTheme((currentTheme) => {
            if (currentTheme === UITheme.Dark) {
                return UITheme.Light;
            }

            if (currentTheme === UITheme.Light) {
                return UITheme.Dark;
            }

            return currentTheme;
        });
    };

    return (
        <button type="button" class={styles.toCssClass()} onClick={toggleDarkMode}>
            <div class="flex items-center justify-center">
                <Show
                    when={isDarkMode()}
                    fallback={
                        <FontAwesomeIcon fw class="text-black dark:text-white" icon={faSun} />
                    }
                >
                    <FontAwesomeIcon fw class="text-black dark:text-white" icon={faMoon} />
                </Show>
            </div>
        </button>
    );
};

export default ThemeToggle;
