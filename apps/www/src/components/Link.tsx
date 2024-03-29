import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {cva, type VariantProps} from 'class-variance-authority';
import {type FunctionComponent, type PropsWithChildren} from 'react';
import {composeClassName} from '@/utilities/styles';

const linkStyles = cva([
    'cursor-pointer',
    'text-black dark:text-white',
    'font-medium',
], {
    variants: {
        variant: {
            primary: [
                'hover:text-primary focus-visible:text-primary',
                'dark:hover:text-primary focus-visible:text-primary',
            ],
            unstyled: '',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

type LinkProps = {
    className?: string;
    href: string;
    target?: '_blank';
    icon?: IconDefinition;
} & VariantProps<typeof linkStyles>;

export const Link: FunctionComponent<PropsWithChildren<LinkProps>> = ({
    children,
    className,
    href,
    icon,
    target,
    variant,
}) => {
    return (
        <a
            href={href}
            target={target}
            rel={target ? 'noopener noreferrer' : undefined}
            className={composeClassName(
                linkStyles({variant}),
                icon && 'flex items-center gap-x-3 text-xs md:text-sm',
                className,
            )}
        >
            {icon && (
                <FontAwesomeIcon
                    fixedWidth
                    icon={icon}
                    size="2x"
                />
            )}
            {children}
        </a>
    );
};
