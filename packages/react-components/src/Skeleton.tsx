import { composeClassName } from '@jupiter/web';
import { type FunctionComponent } from 'react';

type SkeletonProps = {
    className?: string;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({ className }) => {
    return <div className={composeClassName('animate-pulse rounded-md bg-muted', className)} />;
};
