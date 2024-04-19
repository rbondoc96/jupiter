import eslintJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
// import tanstackQuery from '@tanstack/eslint-plugin-query';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
    {
        ignores: [
            'build/**',
            'dist/**',
            'node_modules/**',
            'env.d.ts',
            'tailwind.config.ts',
            'postcss.config.cjs',
            'vite-env.d.ts',
        ],
    },
    {
        files: [
            '**/*.{ts,tsx}',
        ],
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
            },
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                jsxPragma: null,
            },
            sourceType: 'module',
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        plugins: {
            '@typescript-eslint': typescript,
            'jsx-a11y': jsxA11y,
        },
        rules: {
            ...eslintJs.configs.recommended.rules,
            ...typescript.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            'no-redeclare': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: [
            'vite.config.ts',
            'vitest.config.ts',
        ],
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        rules: {
            'no-undef': 'off',
        },
    },
    {
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            // The number attached to `SwitchCase` actually acts like an indentation multiplier.
            '@stylistic/indent': ['error', 4, {SwitchCase: 1}],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'always'],
            // '@stylistic/member-delimiter-style': [
            //     'error',
            //     {
            //         multiline: {
            //             delimiter: 'semi',
            //             requireLast: true,
            //         },
            //         singleline: {
            //             delimiter: 'semi',
            //             requireLast: true,
            //         },
            //     },
            // ],
        },
    },
    {
        files: [
            '**/*.{ts,tsx}',
        ],
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportPlugin,
        },
        rules: {
            'sort-imports': 'off',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
            'import/no-nodejs-modules': [
                'error',
                {
                    allow: ['node:path'],
                },
            ],
            'import/order': 'off',
            'simple-import-sort/exports': 'warn',
            'simple-import-sort/imports': [
                'error',
                {
                    /**
                     * Regex Reference:
                     *  - '.': Any character except newline.
                     *  - '*': Zero or more of the preceding item.
                     *  - '|': Boolean OR. Matches the expression before or after the `|`.
                     *  - '^': Start of the string.
                     *  - '$': End of the string.
                     *
                     * Groups Reference
                     *  - Groups are defined in separate lists.
                     *  - Groups are separated by a newline character in the source code.
                     *
                     * - '^\\u0000': Side effect imports.
                     *  For example: import './polyfills'
                     *
                     * - '^node:': Node.js builtins prefixed with `node:`.
                     *  For example: `import fs from 'node:fs';`
                     *
                     * - '^@?\\w': 3rd party packages.
                     *  Starts with a letter/digit/underscore, or `@` followed by a letter.
                     *  For example: `import {useState} from 'react';`
                     *
                     * - '^~(/.*|$)': Imports that start with `~/`
                     *  For example: `import packageJson from '~/package.json';`
                     *
                     * - '^!(/.*|$)': Imports that start with `!/`
                     *  For example: `import {myHelper} from '!/helpers/my-helper';`
                     *
                     * - '^@(/.*|$)': Imports that start with `@/`
                     *  For example: `import {mySource} from '@/sources/my-source';`
                     *
                     * - '^': Absolute imports and other imports not matched in another group.
                     *
                     * - '^\\.': Relative imports. Anything that starts with a dot.
                     */
                    groups: [
                        ['^\\u0000'],
                        ['^node:', '^@?\\w'],
                        ['^@jupiter(/.*|$)'],
                        ['^~(/.*|$)', '^!(/.*|$)', '^@(/.*|$)'],
                        ['^', '^\\.'],
                    ],
                },
            ],
        },
    },
    {
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        plugins: {
            'react': react,
        },
        rules: {
            ...react.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
    },
    {
        ignores: [
            'dist/**',
            'node_modules/**',
        ],
        plugins: {
            'react-refresh': reactRefresh,
        },
        rules: {
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
        },
    },
    // {
    //     files: [
    //         '**/*.{ts,tsx}',
    //     ],
    //     ignores: [
    //         'dist/**',
    //         'node_modules/**',
    //     ],
    //     plugins: {
    //         '@tanstack/query': tanstackQuery,
    //     },
    //     rules: {
    //         ...tanstackQuery.configs.recommended.rules,
    //     },
    // },
];

export default config;
