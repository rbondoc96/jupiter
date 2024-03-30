import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {type FunctionComponent, type PropsWithChildren} from 'react';
import {composeClassName} from '@/utilities/styles';

const linkStyles = cva([
    'cursor-pointer',
    'text-foreground',
    'text-xs md:text-sm lg:text-base xl:text-lg',
    'font-medium',
    'group',
], {
    variants: {
        variant: {
            primary: [
                'hover:text-primary',
                'focus-visible:text-primary',
            ],
        },
        withChildItem: {
            icon: [
                'flex items-center gap-x-3',
            ],
        },
        childItem: {
            icon: [
                'h-7 w-7',
                'group-hover:text-primary',
            ],
        },
    },
    defaultVariants: {
        variant: 'primary',
        withChildItem: null,
    },
});

type LinkProps = {
    asChild?: boolean;
    className?: string;
    href?: string;
    icon?: IconDefinition;
    target?: '_blank';
} & Omit<VariantProps<typeof linkStyles>, 'childItem' | 'withChildItem'>;

export const Link: FunctionComponent<PropsWithChildren<LinkProps>> = ({
    asChild = false,
    children,
    className,
    href,
    icon,
    target,
    variant,
}) => {
    const Component = asChild ? Slot : 'a';

    return (
        <Component
            href={href}
            target={target}
            rel={target ? 'noopener noreferrer' : undefined}
            className={composeClassName(
                linkStyles({variant}),
                icon && linkStyles({withChildItem: 'icon'}),
                className,       
            )}
        >
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    className={linkStyles({childItem: 'icon'})}
                />
            )}
            {children}
        </Component>
    );
};
