import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from 'solid-fa';
import {type ComponentProps, type ParentComponent, Show, splitProps} from 'solid-js';

import type {BaseComponentProps} from '@/components/types';
import {TailwindStyles} from '@/utilities/tailwind';

type FilteredAnchorProps = Omit<BaseComponentProps<'a'>, 'children' | 'href' | 'rel' | 'target'>;
type FontAwesomeSize = ComponentProps<typeof FontAwesomeIcon>['size'];

const Link: ParentComponent<
    {
        href: string;
        icon?: IconDefinition;
        rel?: 'noopener' | 'noreferrer';
        size?: FontAwesomeSize;
        target?: '_blank';
        unstyled?: boolean;
    } & FilteredAnchorProps
> = (props) => {
    const [componentProps, remainingAnchorProps] = splitProps(props, [
        'children',
        'class',
        'href',
        'icon',
        'rel',
        'size',
        'target',
        'unstyled',
    ]);

    const anchorStyles = new TailwindStyles({
        interaction: 'cursor-pointer',
        textColor:
            'text-black dark:text-white hover:text-rose dark:hover:text-rose focus-visible:text-rose dark:focus-visible:text-rose font-medium',
        textWeight: 'font-medium',
    });

    let underlineStyles: TailwindStyles | undefined;

    // eslint-disable-next-line solid/reactivity
    if (componentProps.icon) {
        anchorStyles
            .add('positioning', 'flex items-center gap-x-3')
            .add('textSize', 'text-xs md:text-sm');
    // eslint-disable-next-line solid/reactivity
    } else if (!componentProps.unstyled) {
        anchorStyles.add('layout', 'relative').add('animation', 'c-hover:scale-x-0');
        underlineStyles = new TailwindStyles({
            animation: 'transition-transform duration-500',
            background: 'bg-cyan',
            positioning: 'absolute bottom-0',
            layout: 'inline-block w-full h-0.5',
        });
    }

    return (
        <a
            class={anchorStyles.toCssClass()}
            href={componentProps.href}
            rel={componentProps.rel}
            target={componentProps.target}
            {...remainingAnchorProps}
        >
            <Show when={!componentProps.unstyled}>
                <span class={underlineStyles?.toCssClass()} />
            </Show>
            <Show when={componentProps.icon}>
                {(icon) => (
                    <FontAwesomeIcon
                        class="mr-2"
                        icon={icon()}
                        size={componentProps.size ?? '2x'}
                    />
                )}
            </Show>
            {componentProps.children}
        </a>
    );
};

export default Link;
