import {createRouter, RouterProvider} from '@tanstack/react-router';
import {type ReactNode} from 'react';

import {useRootContext} from '@/core/providers/RootProvider';
import {queryClient} from '@/core/queryClient';
import {routeTree} from '@/routeTree.gen';

const router = createRouter({
    routeTree,
    context: {
        app: {
            name: 'Root',
            setName: () => {},
        },
        queryClient,
    },
    // Routes will be preloaded by default when the user hovers over a link
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
});

export function Router(): ReactNode {
    const {name, setName} = useRootContext();

    return (
        <RouterProvider
            router={router}
            context={{
                app: {
                    name,
                    setName,
                },
                queryClient,
            }}
        />
    );
}
