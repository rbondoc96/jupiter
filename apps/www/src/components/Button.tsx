import {composeClassName} from '@/utilities/styles';
import {cva, type VariantProps} from 'class-variance-authority';
import {type FunctionComponent, type PropsWithChildren} from 'react';

const buttonVariants = cva([
    'rounded-lg',
    'self-center',
], {
    variants: {
        variant: {
            primary: [
                'bg-primary hover:bg-transparent',
                'border-2 border-primary',
                'text-white hover:text-primary',
            ],
        },
        size: {
            md: [
                'px-5 py-3',
                'text-sm md:text-lg',
            ],
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'primary',
    },
});

type ButtonProps = {
    className?: string;
    type?: 'button' | 'submit';
} & VariantProps<typeof buttonVariants>;

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
    children,
    className,
    size,
    type = 'button',
    variant,
}) => {
    return (
        <button
            type={type}
            className={composeClassName(
                buttonVariants({size, variant}),
                className,
            )}
        >
            {children}
        </button>
    );
};
