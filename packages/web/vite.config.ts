import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const cwd = (...paths: string[]) => join(resolve(__dirname), ...paths);

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            entry: cwd('src', 'index.ts'),
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => (format === 'es' ? `${entryName}.mjs` : `${entryName}.cjs`),
        },
    },
    plugins: [
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
