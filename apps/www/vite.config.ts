import {join, resolve} from 'node:path';
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import {defineConfig, type PluginOption} from 'vite';

const transformHtmlPlugin: () => PluginOption = () => {
    return {
        name: 'custom-plugin',
        transformIndexHtml: (html) => {
            if (process.env.NODE_ENV !== 'production') {
                return html.replace(
                    /<!-- Umami Analytics -->/,
                    '',
                );
            }

            return html.replace(
                /<!-- Umami Analytics -->/,
                '<script defer src="https://analytics.us.umami.is/script.js" data-website-id="14eea165-166b-4ea8-9350-b2252b37a723"></script>',
            );
        },
    };
};

const cwd = (...paths: string[]) => join(resolve(__dirname), ...paths);

export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite({
            generatedRouteTree: cwd('src', 'routeTree.gen.ts'),
            quoteStyle: 'single',
            routesDirectory: cwd('src', 'routes'),
        }),
        transformHtmlPlugin(),
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
