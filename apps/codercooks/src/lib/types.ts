import type {Metadata, ResolvingMetadata} from 'next';
import type {ReactNode} from 'react';

/**
 * Type definition for props passed to the `generateMetadata` function.
 * 
 * @template TParams The "dynamic segments" of a dynamic route (e.g. `slug` in `/recipes/[slug]`). Each segment is a key-value pair in this object.
 * @template TSearchParams
 */
type PageProps<
    TParams extends Record<string, string>,
    TSearchParams extends Record<string, string | string[] | undefined> = Record<string, undefined>
> = {
    params: TParams;
    searchParams: TSearchParams;
};

export type PageServerComponent<
    TProps extends PageProps<
        Record<string, string>,
        Record<string, string | string[] | undefined>
    > | {} = {}
> = {
    (props: TProps): Promise<ReactNode>;
    displayName?: string;
};

/**
 * Function that generates metadata for a page.
 * 
 * Note: Only supported in Server Components.
 */
export type GenerateMetadataFunction<
    TProps extends PageProps<
        Record<string, string>,
        Record<string, string | string[] | undefined>
    > | {} = {}
> = (
    props: TProps,
    parent: ResolvingMetadata,
) => Promise<Metadata>;

/**
 * Function that generates the path parameters for a dynamic page route.
 * 
 * This is used to statically generate routes at build-time, instead of on-demand
 * at request time.
 * 
 * Note: Only supported in Server Components.
 */
export type GenerateStaticParamsFunction<TParams extends Record<string, string>> = () => Promise<TParams[]>;

export type GeneratedPageComponentProps<
    TParamsFunction extends GenerateStaticParamsFunction<Record<string, string>>,
> = {
    params: Awaited<ReturnType<TParamsFunction>>[number];
    searchParams: Record<string, string | string[] | undefined>;
}
