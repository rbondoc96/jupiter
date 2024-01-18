const UITheme = {
    Dark: 'dark',
    Light: 'light',
    System: 'system',
} as const;

type UITheme = (typeof UITheme)[keyof typeof UITheme];

export default UITheme;
