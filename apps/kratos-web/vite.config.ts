import {join, resolve} from 'node:path';
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

const cwd = (...paths: string[]) => join(resolve(__dirname), ...paths);

export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite({
            generatedRouteTree: cwd('src', 'routeTree.gen.ts'),
            quoteStyle: 'single',
            routesDirectory: cwd('src', 'routes'),
        }),
        VitePWA({
            devOptions: {
                enabled: true,
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
            manifest: {
                name: 'Kratos',
                short_name: 'Kratos',
                description: 'A fitness tracker app.',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            registerType: 'autoUpdate',
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({url}) => url.pathname.startsWith('/api'),
                        // Look at the cache first, then the network
                        handler: 'CacheFirst' as const,
                        options: {
                            cacheName: 'api-cache',
                            cacheableResponse: {
                                // Only cache 200 responses.
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
            strategies: 'generateSW',
            // srcDir: 'src',
            // filename: '',
        }),
    ],
    resolve: {
        alias: {
            '@jupiter/react-components': resolve(__dirname, '..', '..', 'packages', 'react-components', 'src'),
            '@jupiter/react-primitives': resolve(__dirname, '..', '..', 'packages', 'react-primitives', 'src'),
            '@jupiter/web': resolve(__dirname, '..', '..', 'packages', 'web', 'src'),
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 3000,
        https: {
            cert: cwd('localhost.pem'),
            key: cwd('localhost-key.pem'),
        },
    },
});
