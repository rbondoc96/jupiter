import {type FunctionComponent, type PropsWithChildren, useEffect} from 'react';

import {useRootContext} from '@/core/providers/RootProvider';

export type PageProps = {
    name: string;
};

export const Page: FunctionComponent<PropsWithChildren<PageProps>> = ({
    children,
    name,
}) => {
    const {setName} = useRootContext();

    useEffect(
        () => {
            setName(name);
        },
        [name],
    );

    return children;
}