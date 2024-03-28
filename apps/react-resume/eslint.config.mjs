import reactHooks from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
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
            'react-hooks': reactHooks,
        },
        rules: reactHooks.configs.recommended.rules,
    },
];

export default config;
