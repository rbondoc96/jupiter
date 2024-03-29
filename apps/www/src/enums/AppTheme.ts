const AppTheme = {
    Dark: 'dark',
    Light: 'light',
    System: 'system',
} as const;

type AppTheme = typeof AppTheme[keyof typeof AppTheme];

export {AppTheme};
