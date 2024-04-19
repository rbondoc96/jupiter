import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
// import twColors from 'tailwindcss/colors';

export default {
    content: [
        './src/**/*.{ts,tsx}',
        // Needed to load the Tailwind styles used in Jupiter UI
        './node_modules/@jupiter/ui-react/src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        extend: {
            colors: {
                green: 'hsl(var(--green))',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                },

                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                // accent: {
                //     DEFAULT: twColors.indigo['500'],
                //     foreground: twColors.indigo['300'],
                // },
                // background: '#FFFFFF',
                // dark: {
                //     300: '#9DB3B3',
                //     500: '#566666',
                //     700: '#1D2828',
                // },
                // destructive: twColors.red['600'],
                // muted: {
                //     DEFAULT: twColors.gray['500'],
                //     foreground: twColors.gray['400'],
                // },
                // light: {
                //     100: '#FFFFFF',
                //     300: '#F9F7F3',
                //     500: '#C2C2C2',
                // },
                // popover: {
                //     DEFAULT: twColors.gray['400'],
                //     foreground: twColors.gray['200'],
                // },
                // primary: {
                //     DEFAULT: '#4CF0C4',
                //     foreground: '#1D2828',
                // },
                // ring: '#4CF0C4',
                // secondary: twColors.indigo['500'],
            },
            screens: {
                xs: '480px',
            },
            zIndex: {
                modalBackdrop: '9',
                modal: '10',
                stickyAction: '20',
                navBackdrop: '29',
                nav: '30',
                alert: '50',
            },
        },
    },
    plugins: [
        plugin(({addUtilities}) => {
            addUtilities({
                '.inline-size-full': {
                    inlineSize: '100%',
                },
            });
        }),
    ],
} satisfies Config;
