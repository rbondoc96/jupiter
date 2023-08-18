import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    build: {
        target: 'esnext',
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    plugins: [solidPlugin()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
