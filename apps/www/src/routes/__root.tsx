import {createRootRoute, Outlet, ScrollRestoration} from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RouterRoot,
});

function RouterRoot() {
    return (
        <>
            <ScrollRestoration />
            <Outlet />
        </>
    );
}
