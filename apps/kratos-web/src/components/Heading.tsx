import {cva, type VariantProps} from 'class-variance-authority';
import {type FunctionComponent, type JSX} from 'react';

const headingVariants = cva(
    'scroll-m-20 tracking-tight',
    {
        variants: {
            variant: {
                h1: 'text-4xl font-extrabold lg:text-5xl',
                h2: 'border-b pb-2 text-3xl font-semibold first:mt-0',
                h3: 'text-2xl font-semibold',
                h4: 'text-xl font-semibold',
            },
        },
    },
);

type HeadingVariantProps = VariantProps<typeof headingVariants>;

type HeadingProps = JSX.IntrinsicElements['h1'] & {
    variant: Exclude<HeadingVariantProps['variant'], null | undefined>;
};

export const Heading: FunctionComponent<HeadingProps> = ({
    children,
    className,
    variant,
    ...props
}: HeadingProps) => {
    const computedClassName = headingVariants({variant, className});

    switch (variant) {
        case 'h1': {
            return <h1 className={computedClassName} {...props}>{children}</h1>;
        }
        case 'h2': {
            return <h2 className={computedClassName} {...props}>{children}</h2>;
        }
        case 'h3': {
            return <h3 className={computedClassName} {...props}>{children}</h3>;
        }
        case 'h4': {
            return <h4 className={computedClassName} {...props}>{children}</h4>;
        }
    }
};
