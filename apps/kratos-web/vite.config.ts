import {join, resolve} from 'node:path';
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

const cwd = (...paths: string[]) => join(resolve(__dirname), ...paths);

export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite({
            generatedRouteTree: cwd('src', 'routeTree.gen.ts'),
            quoteStyle: 'single',
            routesDirectory: cwd('src', 'routes'),
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 3000,
    },
});
