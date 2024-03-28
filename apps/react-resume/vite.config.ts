import {join, resolve} from 'node:path';
import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const cwd = (...paths: string[]) => join(resolve(__dirname), ...paths);

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            entry: cwd('src', 'index.ts'),
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
        },
        rollupOptions: {
            external: [
                ...Object.keys(pkg.dependencies),
                ...Object.keys(pkg.peerDependencies),
            ],
        },
    },
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            exclude: [
                cwd('src', 'components/**'),
                cwd('src', 'App.tsx'),
                cwd('src', 'main.tsx'),
                cwd('src', 'theme.ts'),
            ],
            tsconfigPath: 'tsconfig.build.json',
        }),
    ],
    resolve: {
        alias: {
            '@': cwd('src'),
        },
    },
});
