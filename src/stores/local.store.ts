import {batch} from 'solid-js';
import {createStore} from 'solid-js/store';

type Theme = 'dark' | 'light';

interface LocalStore {
    theme: Theme ;
}

function getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const [localStore, setLocalStore] = createStore<LocalStore>({
    theme: getSystemTheme(),
});

function useSystemTheme(): void {
    localStorage.removeItem('theme');

    const theme = getSystemTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    setLocalStore({
        theme,
    });
}

export function setTheme(theme: 'dark' | 'light' | 'system'): void {
    if (theme === 'system') {
        useSystemTheme();
        return;
    }

    localStorage.setItem('theme', theme);
    setLocalStore({
        theme,
    });
    document.documentElement.classList.toggle('dark', theme === 'dark');
}

function initializeTheme(): void {
    const theme = localStorage.getItem('theme') as Theme | null;    
    setTheme(theme ?? 'system');
}

export function initializeLocalStore(): void {
    batch(() => {
        initializeTheme();
    });
}

export const useLocalStore = (): LocalStore => localStore;
