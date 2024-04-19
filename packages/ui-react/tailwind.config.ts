import {type Config} from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
    content: [
        './index.html',
        './dev/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        screens: {
            // Tailwind's default breakpoints, added for reference
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            zIndex: {
                hidden: '-1',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',

                primary: 'hsl(var(--primary))',

                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },

                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },

                caution: {
                    DEFAULT: 'hsl(var(--caution))',
                    foreground: 'hsl(var(--caution-foreground))',
                },

                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
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

                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },

                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
            },
        },
    },
    plugins: [
        animate,
    ],
} satisfies Config;
