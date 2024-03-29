import eslintJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
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
            'react': react,
        },
        rules: {
            ...eslintJs.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...react.configs.recommended.rules,
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
];

export default config;

