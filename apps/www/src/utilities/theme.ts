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

    // Toggling the `no-transition` class defined in `index.scss` makes it so that
    // any of its descendants won't animate when the `dark` class is added or removed.
    document.body.classList.add('no-transition');
    document.documentElement.classList.toggle('dark', targetTheme === AppTheme.Dark);
    setTimeout(() => document.body.classList.remove('no-transition'), 100);
}
