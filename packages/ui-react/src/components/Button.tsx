import {type IconDefinition, type SizeProp} from '@fortawesome/fontawesome-svg-core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Slot, Slottable} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';
import {forwardRef, type JSX, type PropsWithChildren} from 'react';
import {composeClassName} from '@/utilities/styles';

const buttonStyles = cva([
    'relative',
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
            unstyled: [
                'border-0',
                'rounded-none',
                'p-0',
            ],
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'primary',
    },
});

export type ButtonClassNames = Partial<{
    actionIndicator: string;
    actionIndicatorContainer: string;
    root: string;
}>;

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'className' | 'ref' | 'type'> & {
    actionIndicator?: IconDefinition;
    actionIndicatorSize?: SizeProp;
    asChild?: boolean;
    classNames?: ButtonClassNames;
    isLoading?: boolean;
    type?: 'button' | 'submit';
} & VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
    actionIndicator,
    actionIndicatorSize,
    asChild = false,
    children,
    classNames,
    isLoading = false,
    size,
    type = 'button',
    variant,
    onClick,
    onKeyDown,
    ...props
}, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            type={type}
            ref={ref}
            className={composeClassName(
                buttonStyles({size, variant}),
                classNames?.root,
            )}
            onClick={onClick}
            onKeyDown={onKeyDown}
            {...(asChild ? {} : props)}
        >
            {isLoading && (
                <span
                    className={composeClassName(
                        'absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2',
                        classNames?.actionIndicatorContainer,
                    )}
                >
                    <FontAwesomeIcon
                        className={composeClassName(
                            'animate-spin text-white',
                            classNames?.actionIndicator,
                        )}
                        icon={actionIndicator ?? faSpinner}
                        size={actionIndicatorSize}
                    />
                </span>
            )}
            
            <Slottable>
                {children}
            </Slottable>
        </Component>
    );
});

Button.displayName = 'Button';
