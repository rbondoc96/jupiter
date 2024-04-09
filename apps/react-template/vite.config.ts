import {join, resolve} from 'node:path';
import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

const cwd = (...paths: string[]) => join(resolve(__dirname), ...paths);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
