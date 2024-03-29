import {AppTheme} from '@/enums/AppTheme';

export function getSystemTheme(): AppTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? AppTheme.Dark
        : AppTheme.Light;
}

export function applyAppTheme(appTheme: AppTheme) {
    const targetTheme = appTheme === AppTheme.System
        ? getSystemTheme()
        : appTheme;

    document.body.classList.add('no-transition');
    document.documentElement.classList.toggle('dark', targetTheme === AppTheme.Dark);
    setTimeout(() => document.body.classList.remove('no-transition'), 100);
}
