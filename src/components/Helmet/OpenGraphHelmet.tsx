import {Meta} from '@solidjs/meta';
import {type Component, Show} from 'solid-js';

/**
 * Open Graph attributes control how URLs are displayed
 * when shared on social media.
 *
 * They are part of Facebook's Open Graph Protocol, and are also
 * used by other social media sites, including LinkedIn and Twitter
 * (if Twitter Cards are absent).
 */
type OpenGraphHelmetProps = {
    /**
     * OpenGraph
     *
     * A brief description of the content.
     */
    'og-description'?: string;

    /**
     * OpenGraph
     *
     * The URL of an image for the social snippet.
     *
     * This is probably the most important Open Graph tag because
     * it will occupy most of a post's space in a social feed.
     */
    'og-image'?: string;

    /**
     * OpenGraph
     *
     * Defines the content language.
     */
    'og-locale'?: string;

    /**
     * OpenGraph
     *
     * Title of the page
     */
    'og-title'?: string;

    /**
     * OpenGraph
     *
     * The type of object being shared (e.g. article, website, etc.)
     */
    // The intersection of `string` and `{}` allow us to get IntelliSense
    // hints for 'article' and 'website' as possible values.
    // eslint-disable-next-line @typescript-eslint/ban-types
    'og-type'?: 'article' | 'website' | (string & {});

    /**
     * OpenGraph
     *
     * URL of the content. The URL should be a canonical URL.
     * @see https://ahrefs.com/blog/canonical-tags/
     */
    'og-url'?: string;
};

const OpenGraphHelmet: Component<OpenGraphHelmetProps> = (props) => (
    <>
        <Show when={props['og-description']} keyed>
            {(description) => <Meta property="og:description" content={description} />}
        </Show>

        <Show when={props['og-image']} keyed>
            {(image) => <Meta property="og:image" content={image} />}
        </Show>

        <Show when={props['og-locale']} keyed>
            {(locale) => <Meta property="og:locale" content={locale} />}
        </Show>

        <Show when={props['og-title']} keyed>
            {(title) => <Meta property="og:title" content={title} />}
        </Show>

        <Show when={props['og-type']} keyed>
            {(type) => <Meta property="og:type" content={type} />}
        </Show>

        <Show when={props['og-url']} keyed>
            {(url) => <Meta property="og:url" content={url} />}
        </Show>
    </>
);

export default OpenGraphHelmet;
