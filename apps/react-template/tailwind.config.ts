import { type Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
        // Needed to load the Tailwind styles used in Jupiter UI
        './node_modules/@jupiter/react-components/src/**/*.{ts,tsx}',
        './node_modules/@jupiter/react-primitives/src/**/*.{ts,tsx}',
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
            colors: {
                'primary': 'hsl(var(--primary))',

                'accent': 'hsl(var(--accent))',
                'accent-foreground': 'hsl(var(--accent-foreground))',

                'secondary': 'hsl(var(--secondary))',
                'secondary-foreground': 'hsl(var(--secondary-foreground))',

                'destructive': 'hsl(var(--destructive))',
                'destructive-foreground': 'hsl(var(--destructive-foreground))',

                'card': 'hsl(var(--card))',
                'card-foreground': 'hsl(var(--card-foreground))',

                'background': 'hsl(var(--background))',
                'foreground': 'hsl(var(--foreground))',

                'border': 'hsl(var(--border))',

                'input': 'hsl(var(--input))',

                'ring': 'hsl(var(--ring))',

                'muted': 'hsl(var(--muted))',
                'muted-foreground': 'hsl(var(--muted-foreground))',

                'popover': 'hsl(var(--popover))',
                'popover-foreground': 'hsl(var(--popover-foreground))',
            },
        },
    },
    plugins: [animate],
} satisfies Config;
