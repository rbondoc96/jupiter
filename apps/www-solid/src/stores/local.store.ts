import {type Accessor, batch, createSignal} from 'solid-js';

import UITheme from '@/enums/UITheme';

const [theme, _setTheme] = createSignal<UITheme>(getSystemTheme());

function getSystemTheme(): UITheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? UITheme.Dark : UITheme.Light;
}

function setTheme(value: UITheme): void {
    const targetTheme = value === UITheme.System ? getSystemTheme() : value;

    document.body.classList.add('no-transition');
    document.documentElement.classList.toggle('dark', targetTheme === UITheme.Dark);
    setTimeout(() => document.body.classList.remove('no-transition'), 100);

    _setTheme(targetTheme);
}

export function useTheme(): Accessor<UITheme> {
    return theme;
}

export function useSetTheme(): (valueOrSetter: UITheme | ((value: UITheme) => UITheme)) => void {
    return (valueOrSetter: UITheme | ((value: UITheme) => UITheme)) => {
        // biome-ignore format: easier to read
        const value = typeof valueOrSetter === 'function'
            ? valueOrSetter(theme())
            : valueOrSetter;

        localStorage.setItem('theme', value);
        setTheme(value);
    };
}

function initializeTheme(): void {
    const storedTheme = localStorage.getItem('theme') as UITheme | null;

    setTheme(storedTheme ?? UITheme.System);
}

export function initializeLocalStore(): void {
    batch(() => {
        initializeTheme();
    });
}
