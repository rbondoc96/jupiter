import {Meta} from '@solidjs/meta';
import {type Component, Show} from 'solid-js';

import type {TwitterCardAttributes} from '@/components/Helmet/types';

type TwitterCardHelmetProps = TwitterCardAttributes;

const TwitterCardHelmet: Component<TwitterCardHelmetProps> = props => (
    <>
        <Show when={props['twitter-card']} keyed>
            {card => <Meta name="twitter:card" content={card} />}
        </Show>

        <Show when={props['twitter-creator']} keyed>
            {creator => <Meta name="twitter:creator" content={creator} />}
        </Show>

        <Show when={props['twitter-description']} keyed>
            {description => <Meta name="twitter:description" content={description} />}
        </Show>

        <Show when={props['twitter-image']} keyed>
            {image => <Meta name="twitter:image" content={image} />}
        </Show>

        <Show when={props['twitter-image-alt']} keyed>
            {imageAlt => <Meta name="twitter:image:alt" content={imageAlt} />}
        </Show>

        <Show when={props['twitter-site']} keyed>
            {site => <Meta name="twitter:site" content={site} />}
        </Show>

        <Show when={props['twitter-title']} keyed>
            {title => <Meta name="twitter:title" content={title} />}
        </Show>
    </>
);

export default TwitterCardHelmet;
