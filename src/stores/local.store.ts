import {type Accessor, batch, createSignal} from 'solid-js';

import UITheme from '@/enums/UITheme';

const [theme, _setTheme] = createSignal<UITheme>(getSystemTheme());

function getSystemTheme(): UITheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? UITheme.Dark : UITheme.Light;
}

function setTheme(value: UITheme): void {
    document.body.classList.add('no-transition');
    document.documentElement.classList.toggle('dark', value === UITheme.Dark);
    _setTheme(value);

    setTimeout(() => document.body.classList.remove('no-transition'), 100);
}

export function useTheme(): Accessor<UITheme> {
    return theme;
}

export function useSetTheme(): (valueOrSetter: UITheme | ((value: UITheme) => UITheme)) => void {
    return (valueOrSetter: UITheme | ((value: UITheme) => UITheme)) => {
        // biome-ignore format: easier to read
        const targetTheme = typeof valueOrSetter === 'function'
            ? valueOrSetter(theme())
            : valueOrSetter;

        if (targetTheme === theme()) {
            return;
        }

        localStorage.setItem('theme', targetTheme);
        setTheme(targetTheme === UITheme.System ? getSystemTheme() : targetTheme);
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
