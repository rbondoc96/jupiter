import type {MDXComponents} from 'mdx/types';

// Required to use @next/mdx in the `app` directory.
// Allows customizing built-in components, e.g. to add styling.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return components;
}
