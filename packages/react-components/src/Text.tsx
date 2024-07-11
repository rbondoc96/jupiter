import { cva, type VariantProps } from 'class-variance-authority';
import { composeClassName } from '@jupiter/web';
import { Slot } from '@radix-ui/react-slot';
import { type FunctionComponent, type PropsWithChildren } from 'react';

const textStyles = cva(['text-foreground'], {
    variants: {
        as: {
            h1: ['text-4xl md:text-5xl lg:text-6xl xl:text-7xl', 'font-bold tracking-tighter'],
            h2: ['text-2xl md:text-3xl lg:text-4xl xl:text-5xl', 'tracking-tighter'],
            h3: ['text-xl md:text-2xl lg:text-3xl xl:text-4xl'],
            h4: ['text-lg md:text-xl lg:text-2xl xl:text-3xl'],
            h5: ['text-base md:text-lg lg:text-xl xl:text-2xl'],
            p: ['text-xs md:text-sm lg:text-base xl:text-lg'],
            span: ['text-xs md:text-sm lg:text-base xl:text-lg'],
        },
    },
    defaultVariants: {
        as: 'span',
    },
});

type TextProps = {
    asChild?: boolean;
    as: Exclude<VariantProps<typeof textStyles>['as'], null | undefined>;
    className?: string;
} & Omit<VariantProps<typeof textStyles>, 'as'>;

export const Text: FunctionComponent<PropsWithChildren<TextProps>> = ({ as, asChild = false, children, className }) => {
    const Component = asChild ? Slot : as;

    return <Component className={composeClassName(textStyles({ as }), className)}>{children}</Component>;
};
