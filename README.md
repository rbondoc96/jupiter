# rbondoc.com

## Import Aliasing

When adding new aliases, they must be added in the following files:

- `vite.config.ts`
- `tsconfig.json`

```ts
// vite.config.ts

resolve: {
  alias: {
    '@': resolve(__dirname, 'src'),
    '@mocks': resolve(__dirname, 'mocks'),
  },
},
```

```json
// tsconfig.json

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@mocks/*": ["./mocks/*"]
    }
  }
}
```

## Dependencies

### TailwindCSS

Configuring with Vite: https://tailwindcss.com/docs/guides/vite

- `tailwindcss` -
- `postcss` - TailwindCSS peer dependency
- `autoprefixer` - TailwindCSS peer dependency

## Code Style

### Configuring ESLint and Prettier

- `eslint` - Main linter.
- `prettier` - Main code formatter.
- `@typescript-eslint/eslint-plugin` - An ESLint plugin which provides rules for TypeScript codebases.
- `@typescript-eslint/parser` - A parser which allows ESLint to lint TypeScript source code.
- `eslint-config-google` - Google JS style rules
- `eslint-config-prettier` - An ESLint configuration which disables the formatting rules in ESLint that Prettier is going to be responsible for handling, hence avoiding any clashes.
- `eslint-config-standard-with-typescript` -
- `eslint-plugin-import` - Tells ESLint how to resolve imports.
- `eslint-plugin-jsx-a11y` - Checks for accessiblity issues.
- `eslint-plugin-n` -
- `eslint-plugin-promise` -
- `eslint-plugin-react` - React specific linting rules for ESLint.
- `eslint-plugin-react-hooks` -

### ESLint

### Prettier
