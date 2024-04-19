const ScreenSize = {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
    XXL: 'xxl',
} as const;

type ScreenSize = typeof ScreenSize[keyof typeof ScreenSize];

export {ScreenSize};
