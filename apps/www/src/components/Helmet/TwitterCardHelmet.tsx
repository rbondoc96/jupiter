import {Meta} from '@solidjs/meta';
import {type Component, Show} from 'solid-js';

type TwitterCardHelmetProps = {
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

const TwitterCardHelmet: Component<TwitterCardHelmetProps> = (props) => (
    <>
        <Show when={props['twitter-card']} keyed>
            {(card) => <Meta name="twitter:card" content={card} />}
        </Show>

        <Show when={props['twitter-creator']} keyed>
            {(creator) => <Meta name="twitter:creator" content={creator} />}
        </Show>

        <Show when={props['twitter-description']} keyed>
            {(description) => <Meta name="twitter:description" content={description} />}
        </Show>

        <Show when={props['twitter-image']} keyed>
            {(image) => <Meta name="twitter:image" content={image} />}
        </Show>

        <Show when={props['twitter-image-alt']} keyed>
            {(imageAlt) => <Meta name="twitter:image:alt" content={imageAlt} />}
        </Show>

        <Show when={props['twitter-site']} keyed>
            {(site) => <Meta name="twitter:site" content={site} />}
        </Show>

        <Show when={props['twitter-title']} keyed>
            {(title) => <Meta name="twitter:title" content={title} />}
        </Show>
    </>
);

export default TwitterCardHelmet;
