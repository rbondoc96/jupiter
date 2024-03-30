import {type Config} from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
    ],
    theme: {},
    plugins: [
        animate,
    ],
} satisfies Config;
