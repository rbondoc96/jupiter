import {type FunctionComponent} from 'react';
import {composeClassName} from '@/utilities/styles';

type SkeletonProps = {
    className?: string;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({
    className,
}) => {
    return (
        <div
            className={composeClassName(
                'animate-pulse rounded-md bg-muted',
                className,
            )}
        />
    );
};
