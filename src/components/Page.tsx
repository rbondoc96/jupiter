import {Motion} from '@motionone/solid';
import {type ParentComponent, splitProps} from 'solid-js';

import Helmet, {type HelmetProps} from '@/components/Helmet';
import type {
    AnimatedComponentProps,
    BaseComponentProps,
} from '@/components/types';

type PageProps = HelmetProps & AnimatedComponentProps & BaseComponentProps<'div'>;

const Page: ParentComponent<PageProps> = props => {
    const [helmetProps, propsWithHelmet] = splitProps(props, [
        'author',
        'description',
        'image',
        'links',
        'title',
        'og-description',
        'og-image',
        'og-locale',
        'og-title',
        'og-type',
        'og-url',
        'twitter-card',
        'twitter-creator',
        'twitter-description',
        'twitter-image',
        'twitter-image-alt',
        'twitter-site',
        'twitter-title',
    ]);

    const [propsWithChildren, componentProps] = splitProps(propsWithHelmet, ['children']);

    const [motionProps, rest] = splitProps(componentProps, [
        'anim-initial',
        'anim-animate',
        'anim-hover',
        'anim-press',
        'anim-exit',
        'anim-variants',
        'anim-transition',
    ]);

    return (
        <Motion.div
            initial={motionProps['anim-initial']}
            animate={motionProps['anim-animate']}
            hover={motionProps['anim-hover']}
            press={motionProps['anim-press']}
            exit={motionProps['anim-exit']}
            variants={motionProps['anim-variants']}
            transition={motionProps['anim-transition']}
            {...rest}
        >
            <Helmet {...helmetProps} />
            {propsWithChildren.children}
        </Motion.div>
    );
};

export default Page;
