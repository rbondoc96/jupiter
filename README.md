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

### Development Tools

- `typescript` -
- `vite` -
- `@vitejs/plugin-react` -

### Types for TypeScript

- `@types/node` -
- `@types/react` -
- `@types/react-dom` -

### Assets

- `@fontsource/work-sans` - Font used for this project.
- `@fortawesome/fontawesome-svg-core` - Required for using SVGs for FontAwesome.
- `@fortawesome/free-brands-svg-icons` - Icons for brands (Facebook, GitHub, etc.)
- `@fortawesome/free-regular-svg-icons` - Used for outlined versions of solid icons.
- `@fortawesome/free-solid-svg-icons` - Filled/solid icons.
- `@fortawesome/react-fontawesome` - Provides `<FontAwesomeIcon />` component.

### React

- `react` - JS frontend library
- `react-dom` -
- `react-router-dom` -
- `react-snapshot` -

### TailwindCSS

Configuring with Vite: https://tailwindcss.com/docs/guides/vite

- `tailwindcss` - CSS utility framework
- `postcss` - TailwindCSS peer dependency
- `autoprefixer` - TailwindCSS peer dependency

### Code Style

#### ESLint

- `eslint` - Main linter.
- `eslint-plugin-import` - Tells ESLint how to resolve imports.
- `eslint-import-resolver-typescript` - Allows `eslint` to resolve aliases defined in `tsconfig.json`
- `eslint-config-google` - Google JS style rules.
- `eslint-config-standard-with-typescript` - Standard ESLint rules for TypeScript.
- `eslint-plugin-jsx-a11y` - Checks for accessiblity issues.
- `eslint-plugin-n` -
- `eslint-plugin-promise` -
- `eslint-plugin-react` - React specific linting rules for ESLint.
- `eslint-plugin-react-hooks` - Linting rules for using React hooks
- `@typescript-eslint/eslint-plugin` - An ESLint plugin which provides rules for TypeScript codebases.
- `@typescript-eslint/parser` - A parser which allows ESLint to lint TypeScript source code.

#### Prettier

- `prettier` - Main code formatter.

#### Configuring ESLint and Prettier

- `eslint-config-prettier` - An ESLint configuration which disables the formatting rules in ESLint that Prettier is going to be responsible for handling, hence avoiding any clashes.
