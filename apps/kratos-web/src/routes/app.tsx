import {CatchBoundary, createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {Suspense} from 'react';

import {AppProvider} from '@/core/providers/AppProvider';
import {userFetchQuery} from '@/core/queries';

export const Route = createFileRoute('/app')({
    beforeLoad: async ({context, location}) => {
        const {queryClient} = context;
        
        try {
            await queryClient.ensureQueryData(userFetchQuery());
        } catch (error) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                    view: 'unauth',
                },
            })
        }
    },
    // This error component prevents an error page from being shown
    // when logging out of the app.
    // This allows the app to log out as expected.
    errorComponent: () => {
        <CatchBoundary getResetKey={() => Math.random().toString()}>
            {null}
        </CatchBoundary>
    },
    component: () => (
        <AppProvider>
            <Suspense>
                <Outlet />
            </Suspense>
        </AppProvider>
    ),
});