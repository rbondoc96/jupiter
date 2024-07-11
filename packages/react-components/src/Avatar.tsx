import { composeClassName } from '@jupiter/web';
import { Fallback as AvatarFallback, Image as AvatarImage, Root as AvatarRoot } from '@radix-ui/react-avatar';
import { type ReactNode } from 'react';

export type AvatarClassNames = Partial<{
    container: string;
    fallback: string;
    image: string;
}>;

type AvatarProps = {
    alt: string;
    classNames?: AvatarClassNames;
    fallback: ReactNode;
    src: string;
};

export function Avatar({ alt, classNames, fallback, src }: AvatarProps): ReactNode {
    return (
        <AvatarRoot
            className={composeClassName(
                'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
                classNames?.container,
            )}
        >
            <AvatarImage
                alt={alt}
                className={composeClassName('aspect-square h-full w-full', classNames?.image)}
                src={src}
            />

            <AvatarFallback
                className={composeClassName(
                    'flex h-full w-full items-center justify-center rounded-full bg-muted',
                    classNames?.fallback,
                )}
            >
                {fallback}
            </AvatarFallback>
        </AvatarRoot>
    );
}
