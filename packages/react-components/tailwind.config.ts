import { type Config } from 'tailwindcss';
import animated from 'tailwindcss-animated';

export default {
    content: ['./src/**/*.{ts,tsx}'],
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
    plugins: [animated],
} satisfies Config;
