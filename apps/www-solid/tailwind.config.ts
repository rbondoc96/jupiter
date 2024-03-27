import type {Config} from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import type {PluginAPI} from 'tailwindcss/types/config';

import breakpoints from './src/core/breakpoints.json';

export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
            },
            letterSpacing: {
                tightest: '-.075em',
            },
        },
        screens: {
            xs: `${breakpoints.xs}px`,
            sm: `${breakpoints.sm}px`,
            md: `${breakpoints.md}px`,
            lg: `${breakpoints.lg}px`,
            xl: `${breakpoints.xl}px`,
            '2xl': `${breakpoints['2xl']}px`,
        },
        colors: {
            black: 'hsl(240, 37.9%, 5.7%)',
            cyan: {
                DEFAULT: 'hsl(185, 90.2%, 48.2%)',
                400: 'hsl(185, 90.2%, 48.2%)',
                700: colors.cyan[700],
            },
            gray: {
                950: 'hsl(240, 37.9%, 5.7%)',
            },
            rose: {
                DEFAULT: 'hsl(347, 67.8%, 47.5%)',
                600: 'hsl(347, 67.8%, 47.5%)',
            },
            slate: {
                200: colors.slate['200'],
                300: colors.slate['300'],
                400: colors.slate['400'],
                800: 'hsl(230, 30%, 20%)',
                950: 'hsl(240, 25%, 10%)',
            },
            transparent: colors.transparent,
            violet: {
                400: 'hsl(247.14, 36.84%, 44.71%)',
            },
            white: colors.zinc[50],
        },
        textColor: {
            black: 'hsl(240, 37.9%, 5.7%)',
            cyan: {
                DEFAULT: 'hsl(185, 90.2%, 48.2%)',
                400: 'hsl(185, 90.2%, 48.2%)',
            },
            gray: {
                400: colors.gray[400],
                500: colors.gray[500],
                950: 'hsl(240, 37.9%, 5.7%)',
            },
            muted: colors.zinc[400],
            rose: {
                DEFAULT: 'hsl(347, 67.8%, 47.5%)',
                600: 'hsl(347, 67.8%, 47.5%)',
            },
            transparent: colors.transparent,
            white: colors.zinc[50],
        },
    },
    plugins: [
        plugin((api: PluginAPI) => {
            api.addVariant('c-hover', '&:hover > *');
        }),
    ],
} satisfies Config;
