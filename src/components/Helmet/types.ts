import type {JSX} from 'solid-js';

type LinkPreload = {
    rel: 'preload';
    as: JSX.IntrinsicElements['link']['as'];
    type: `text/${'css' | 'html' | 'js'}`;
};

export type LinkAttribute =
    | LinkPreload
    | {
          rel: string;
          type: string;
          [key: string]: string;
      };

export type MetaAttribute = {
    name: string;
    content: string;
} | {
    property: string;
    content: string;
};

/**
 * Open Graph attributes control how URLs are displayed
 * when shared on social media.
 * 
 * They are part of Facebook's Open Graph Protocol, and are also
 * used by other social media sites, including LinkedIn and Twitter
 * (if Twitter Cards are absent).
 */
export type OpenGraphAttributes = {
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

export type TwitterCardAttributes = {
    /**
     * Twitter cards
     * 
     * The type of the card.
     */
    'twitter-card'?: 'summary' | 'summary_large_image' | 'app' | 'player';
    /**
     * The Twitter @username of the content creator.
     */
    'twitter-creator'?: string;
    /**
     * Twitter cards
     * 
     * Description of the content. (Max 200 characters)
     */
    'twitter-description'?: string;
    /**
     * Twitter cards
     * 
     * URL of the image to use. (Must be less than 5MB)
     * 
     * Formats: JPG, PNG, WEBP, GIF. SVG is not supported.
     * 
     * For GIFs, only the first frame will be used.
     */
    'twitter-image'?: string;
    /**
     * Twitter cards
     * 
     * Description of the image conveying its meaning to visually impaired users.
     * (Max 420 characters)
     */
    'twitter-image-alt'?: string;    
    /**
     * Twitter cards
     * 
     * The Twitter @username of the website.
     */
    'twitter-site'?: string;
    /**
     * Twitter cards
     * 
     * Title of the content. (Max 70 characters)
     */
    'twitter-title'?: string;
};
