import {type ReactNode, type PropsWithChildren} from 'react';

import {composeClassName} from '@/utilities/styles';

type ImageWithOverlayProps = PropsWithChildren<{
    alt: string;
    classNames?: {
        container?: string;
        contentContainer?: string;
        image?: string;
        imageContainer?: string;
        imageFallback?: string;
        overlay?: string;
    };
    src?: string;
}>;

export function ImageWithOverlay({
    alt,
    children,
    classNames,
    src,
}: ImageWithOverlayProps): ReactNode {
    return (
        <div
            className={composeClassName(
                'relative shrink-0 h-[14rem]',
                classNames?.container,
            )}
        >
            <div
                className={composeClassName(
                    'absolute inset-0 bg-gray-900/70 rounded-lg',
                    classNames?.overlay,
                )}
            />

            <div className="absolute inset-0 flex flex-col rounded-lg">
                {children}
            </div>

            <div
                className={composeClassName(
                    'flex h-full',
                    classNames?.imageContainer,
                )}
            >
                {src ? (
                    <img
                        alt={alt}
                        className={composeClassName(
                            'aspect-[4/5] inline-size-full object-cover rounded-lg',
                            classNames?.image,
                        )}
                        src={src}
                    />
                ) : (
                    <div
                        className={composeClassName(
                            'bg-blue-800 flex-1 rounded-lg',
                            classNames?.imageFallback,
                        )}
                    />
                )}
            </div>
        </div>
    );
}
