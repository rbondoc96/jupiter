import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {A as RouterLink} from '@solidjs/router';
import FontAwesomeIcon from 'solid-fa';
import {type ParentComponent, Show} from 'solid-js';

import type {BaseComponentProps} from '@/components/types';
import {TailwindStyles} from '@/utilities/tailwind';

type BaseButtonProps = {
    type: 'button' | 'reset' | 'submit';
} & Omit<BaseComponentProps<'button'>, 'type'>;

type LinkButtonProps = {
    type: 'link';
    href: string;
    rel?: 'noopener' | 'noreferrer';
    target?: '_blank';
} & Omit<BaseComponentProps<'a'>, 'href' | 'rel' | 'target'>;

type RouterLinkButtonProps = {
    type: 'router-link';
    href: string;
};

type ButtonProps = (BaseButtonProps | LinkButtonProps | RouterLinkButtonProps) & {
    icon?: IconDefinition;
};

const Button: ParentComponent<ButtonProps> = (props) => {
    const styles = new TailwindStyles({
        background: 'bg-rose hover:bg-transparent',
        border: 'border-2 border-rose rounded-lg',
        layout: 'self-center',
        padding: 'px-5 py-3',
        textColor: 'text-white hover:text-rose',
        textSize: 'text-sm md:text-lg',
    });

    // eslint-disable-next-line solid/reactivity
    if (props.type === 'link') {
        // eslint-disable-next-line solid/components-return-once
        return (
            <a class={styles.toCssClass()} href={props.href} rel={props.rel} target={props.target}>
                <Show when={props.icon}>
                    {(icon) => <FontAwesomeIcon icon={icon()} />}
                </Show>
                {props.children}
            </a>
        );
    }

    // eslint-disable-next-line solid/reactivity
    if (props.type === 'router-link') {
        // eslint-disable-next-line solid/components-return-once
        return (
            <RouterLink class={styles.toCssClass()} href={props.href}>
                <Show when={props.icon}>
                    {(icon) => <FontAwesomeIcon icon={icon()} />}
                </Show>
                {props.children}
            </RouterLink>
        );
    }

    return (
        <button class={styles.toCssClass()} type={props.type}>
            <Show when={props.icon}>
                {(icon) => <FontAwesomeIcon icon={icon()} />}
            </Show>
            {props.children}
        </button>
    );
};

export default Button;
