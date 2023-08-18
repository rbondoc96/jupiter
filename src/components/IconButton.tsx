import {type IconDefinition as BrandIconDefinition} from '@fortawesome/free-brands-svg-icons';
import {type IconDefinition as RegularIconDefinition} from '@fortawesome/free-regular-svg-icons';
import {type IconDefinition as SolidIconDefinition} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from 'solid-fa';
import {type Component, Show} from 'solid-js';

type IconDefinition = BrandIconDefinition | RegularIconDefinition | SolidIconDefinition;

type IconButtonProps = {
    class?: string;
    href: string;
    icon: IconDefinition;
    label?: string;
    rel?: 'noopener noreferrer' | 'noreferrer noopener' | 'noopener' | 'noreferrer';
    size?: Parameters<typeof FontAwesomeIcon>[0]['size'];
    target?: '_blank';
};

const IconButton: Component<IconButtonProps> = props => (
    <a
        class={props.class}
        href={props.href}
        rel={props.rel}
        target={props.target}
    >
        <FontAwesomeIcon
            icon={props.icon}
            size={props.size}
        />
        <Show keyed when={props.label}>
            {label => label}
        </Show>
    </a>
);

export default IconButton;
