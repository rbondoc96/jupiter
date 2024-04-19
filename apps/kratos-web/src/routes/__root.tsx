import {type QueryClient} from '@tanstack/react-query';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createRootRouteWithContext, Outlet, ScrollRestoration} from '@tanstack/react-router';
import {Suspense} from 'react';

// const TanStackRouterDevtools = import.meta.env.MODE === 'development'
//     ? lazy(() => import('@tanstack/router-devtools')
//         .then(result => ({
//             default: result.TanStackRouterDevtools,
//         })),
//     ) : () => null;

export type RootRouteContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
    component: RouterRoot,
});

function RouterRoot() {
    return (
        <>
            <ScrollRestoration />

            <Suspense>
                <Outlet />
            </Suspense>

            {/*<ReactQueryDevtools buttonPosition="bottom-left" />*/}
            {/* <Suspense>
                <TanStackRouterDevtools position="bottom-right" />
            </Suspense> */}
        </>
    );
}
