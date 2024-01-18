import {type ComponentProps, type ParentComponent, splitProps} from 'solid-js';
import {Motion} from 'solid-motionone';

import Helmet from '@/components/Helmet';
import type {AnimatedComponentProps, BaseComponentProps} from '@/components/types';

type HelmetProps = ComponentProps<typeof Helmet>;
type PageProps = HelmetProps & AnimatedComponentProps & BaseComponentProps<'div'>;

const Page: ParentComponent<PageProps> = (props) => {
    const [helmetProps, propsWithoutHelmet] = splitProps(props, [
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

    const [animatedProps, parentProps] = splitProps(propsWithoutHelmet, [
        'anim-initial',
        'anim-animate',
        'anim-hover',
        'anim-press',
        'anim-exit',
        'anim-variants',
        'anim-transition',
    ]);

    const [propsWithChildren, divElementProps] = splitProps(parentProps, ['children']);

    return (
        <Motion.div
            initial={animatedProps['anim-initial']}
            animate={animatedProps['anim-animate']}
            hover={animatedProps['anim-hover']}
            press={animatedProps['anim-press']}
            exit={animatedProps['anim-exit']}
            variants={animatedProps['anim-variants']}
            transition={animatedProps['anim-transition']}
            {...divElementProps}
        >
            <Helmet {...helmetProps} />
            {propsWithChildren.children}
        </Motion.div>
    );
};

export default Page;
