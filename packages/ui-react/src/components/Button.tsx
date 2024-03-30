import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {forwardRef, type PropsWithChildren} from 'react';
import {composeClassName} from '@/utilities/styles';

const buttonStyles = cva([
    'border-2',
    'self-center',
    'text-center',
], {
    variants: {
        size: {
            md: [
                'rounded-lg',
                'px-5 py-3',
                'text-sm md:text-base',
            ],
        },
        variant: {
            primary: [
                'bg-primary hover:bg-transparent',
                'border-primary',
                'text-white hover:text-primary',
            ],
            primaryGhost: [
                'bg-transparent',
                'border-primary',
                'text-primary',
            ],
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'primary',
    },
});

type ButtonProps = {
    asChild?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
    onKeyDown?: () => void;
} & VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
    asChild = false,
    children,
    className,
    size,
    type = 'button',
    variant,
    onClick,
    onKeyDown,
}, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            type={type}
            ref={ref}
            className={composeClassName(
                buttonStyles({size, variant}),
                className,
            )}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            {children}
        </Component>
    );
});

Button.displayName = 'Button';
