import {type PropsWithChildren, type ReactNode, useEffect} from 'react';

import {useAppSetName} from '@/hooks/stores/useAppStore';

export type PageProps = {
    name: string;
};

export function Page({
    children,
    name,
}: PropsWithChildren<PageProps>): ReactNode {
    const setName = useAppSetName();

    useEffect(
        () => {
            setName(name);
        },
        [name, setName],
    );

    return children;
}