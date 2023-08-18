import {Meta} from '@solidjs/meta';
import {type Component, Show} from 'solid-js';

import type {OpenGraphAttributes} from '@/components/Helmet/types';

type OpenGraphHelmetProps = OpenGraphAttributes;

const OpenGraphHelmet: Component<OpenGraphHelmetProps> = props => (
    <>
        <Show when={props['og-description']} keyed>
            {description => <Meta property="og:description" content={description} />}
        </Show>

        <Show when={props['og-image']} keyed>
            {image => <Meta property="og:image" content={image} />}
        </Show>

        <Show when={props['og-locale']} keyed>
            {locale => <Meta property="og:locale" content={locale} />}
        </Show>

        <Show when={props['og-title']} keyed>
            {title => <Meta property="og:title" content={title} />}
        </Show>

        <Show when={props['og-type']} keyed>
            {type => <Meta property="og:type" content={type} />}
        </Show>

        <Show when={props['og-url']} keyed>
            {url => <Meta property="og:url" content={url} />}
        </Show>
    </>
);

export default OpenGraphHelmet;
