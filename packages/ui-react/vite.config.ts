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
            entry: {
                'index': cwd('src', 'index.ts'),
                'enums': cwd('src', 'lib', 'enums', 'index.ts'),
                'errors': cwd('src', 'lib', 'errors', 'index.ts'),
                'lib': cwd('src', 'lib', 'index.ts'),
                'primitives': cwd('src', 'primitives', 'index.ts'),
                'utilities': cwd('src', 'utilities', 'index.ts'),
            },
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => (format === 'es' ? `${entryName}.mjs` : `${entryName}.cjs`),
        },
        rollupOptions: {
            external: [
                'react/jsx-runtime',
                ...Object.keys(pkg.peerDependencies),
            ],
        },
    },
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            tsconfigPath: 'tsconfig.build.json',
        }),
    ],
    resolve: {
        alias: {
            '@': cwd('src'),
        },
    },
});
