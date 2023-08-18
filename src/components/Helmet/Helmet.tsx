import {Link, Meta, Title} from '@solidjs/meta';
import {type Component, Index, mergeProps, Show, splitProps} from 'solid-js';

import OpenGraphHelmet from '@/components/Helmet/OpenGraphHelmet';
import TwitterCardHelmet from '@/components/Helmet/TwitterCardHelmet';
import type {
    LinkAttribute,
    MetaAttribute,
    OpenGraphAttributes,
    TwitterCardAttributes,
} from '@/components/Helmet/types';

export type HelmetProps = {
    author?: string;
    description?: string;
    favicon?: `${string}.ico`;
    image?: string;
    title?: string;
    links?: LinkAttribute[];
    meta?: MetaAttribute[];
} & OpenGraphAttributes & TwitterCardAttributes;

const Helmet: Component<HelmetProps> = props => {
    const propsWithDefaults = mergeProps(
        {
            links: [],
        },
        props,
    );

    const [openGraphProps, propsWithoutOpenGraph] = splitProps(propsWithDefaults, [
        'og-description',
        'og-image',
        'og-locale',
        'og-title',
        'og-type',
        'og-url',
    ]);

    const [twitterCardProps, remainingProps] = splitProps(propsWithoutOpenGraph, [
        'twitter-card',
        'twitter-creator',
        'twitter-description',
        'twitter-image',
        'twitter-image-alt',
        'twitter-site',
        'twitter-title',
    ]);

    return (
        <>
            <Show when={remainingProps.title} keyed>
                {title => <Title>{title}</Title>}
            </Show>

            <Show when={remainingProps.favicon} keyed>
                {favicon => <Link rel="icon" type="image/ico" href={favicon} />}
            </Show>

            <Show when={remainingProps.author} keyed>
                {author => <Meta name="author" content={author} />}
            </Show>

            <Show when={remainingProps.description} keyed>
                {description => <Meta name="description" content={description} />}
            </Show>

            <Show when={remainingProps.image} keyed>
                {image => <Meta name="image" content={image} />}
            </Show>

            <OpenGraphHelmet {...openGraphProps} />

            <TwitterCardHelmet {...twitterCardProps} />
            
            <Index each={remainingProps.links}>{link => <Link {...link()} />}</Index>
            <Index each={remainingProps.meta}>{meta => <Meta {...meta()} />}</Index>
        </>
    );
};

export default Helmet;
