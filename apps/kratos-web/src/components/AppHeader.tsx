import {type ReactNode, memo} from 'react';

import {composeClassName} from '@jupiter/ui-react/utilities';

type AppHeaderProps = {
    classNames?: {
        title?: string;
    };
    title?: string;
};

export function AppHeader({
    classNames,
    title,
}: AppHeaderProps): ReactNode {
    return (
        <header className="absolute top-0 inset-x-0 h-14 flex">
            <div className="w-full flex flex-col">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col px-4">
                        <div className="flex-1 flex flex-col justify-center">
                            {title && (
                                <h2 className={composeClassName(
                                    'text-lg font-bold',
                                    classNames?.title,
                                )}>
                                    {title}
                                </h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function Skeleton({
    classNames,
}: Pick<AppHeaderProps, 'classNames'>): ReactNode {
    return (
        <AppHeader
            classNames={classNames}
        />
    );
}

export const AppHeaderSkeleton = memo(Skeleton);
