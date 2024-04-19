import {QueryClientProvider} from '@tanstack/react-query';
import {type FunctionComponent, useCallback, useEffect} from 'react';
import {HelmetProvider} from 'react-helmet-async';

import {RootProvider} from '@/core/providers/RootProvider';
import {queryClient} from '@/core/queryClient';
import {checkIfUserAgentIsMobile, resolveViewportState, resolveWindowWidthToScreenSize} from '@/lib/window';
import {Router} from '@/Router';
import {useScreenSize, useSetIsMostLikelyMobile, useSetScreenSize, useSetViewportState} from '@/stores/ui.store';

export const Root: FunctionComponent = () => {
    const screenSize = useScreenSize();
    const setScreenSize = useSetScreenSize();
    const setIsMostLikelyMobile = useSetIsMostLikelyMobile();
    const setViewportState = useSetViewportState();

    const onWindowResize = useCallback(
        () => {
            const currentScreenSize = resolveWindowWidthToScreenSize();
            const isMostLikelyMobile = checkIfUserAgentIsMobile();

            setIsMostLikelyMobile(isMostLikelyMobile);
            setScreenSize(currentScreenSize);
            setViewportState(resolveViewportState(screenSize, currentScreenSize));
        },
        [screenSize, setIsMostLikelyMobile, setScreenSize, setViewportState],
    );

    useEffect(
        () => {
            window.addEventListener('resize', onWindowResize);
            return () => window.removeEventListener('resize', onWindowResize);
        },
        [onWindowResize],
    );

    return (
        <QueryClientProvider client={queryClient}>
            <RootProvider>
                <HelmetProvider>
                    <Router />
                </HelmetProvider>
            </RootProvider>
        </QueryClientProvider>
    );
};
