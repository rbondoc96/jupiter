import {CatchBoundary, createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {type ReactNode, useRef} from 'react';

import {composeClassName} from '@jupiter/ui-react/utilities';

import {AppSideBar} from '@/components/AppSideBar';
import {AppTabBar} from '@/components/AppTabBar';
import {userFetchQuery} from '@/core/queries';
import {useViewportIsMostLikelyMobile} from '@/hooks/stores/useViewportStore';

export const Route = createFileRoute('/app')({
    beforeLoad: async ({context, location}) => {
        const {queryClient} = context;
        
        try {
            await queryClient.ensureQueryData(userFetchQuery());
        } catch (error) {
            throw redirect({
                to: '/login',
                replace: true,
                search: {
                    redirect: location.href,
                    view: 'unauth',
                },
            });
        }
    },
    // This error component prevents an error page from being shown
    // when logging out of the app.
    // This allows the app to log out as expected.
    errorComponent: () => {
        <CatchBoundary getResetKey={() => Math.random().toString()}>
            {null}
        </CatchBoundary>;
    },
    component: Component,
});

function Component(): ReactNode {
    const isMostLikelyMobile = useViewportIsMostLikelyMobile();
    const sideBarRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="flex flex-1">
            {!isMostLikelyMobile && <AppSideBar ref={sideBarRef} />}

            <div
                className={composeClassName(
                    isMostLikelyMobile && 'pb-14 w-screen',
                )}
            >
                <Outlet />
            </div>

            {isMostLikelyMobile && <AppTabBar />}
        </div>
    );
}