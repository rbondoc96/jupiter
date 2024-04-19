import {QueryClientProvider} from '@tanstack/react-query';
import {type FunctionComponent, useCallback, useEffect} from 'react';
import {HelmetProvider} from 'react-helmet-async';

import {queryClient} from '@/core/queryClient';
import {
    useViewportScreenSize,
    useViewportSetIsMostLikelyMobile,
    useViewportSetScreenSize,
    useViewportSetViewportState,
} from '@/hooks/stores/useViewportStore';
import {checkIfUserAgentIsMobile, resolveViewportState, resolveWindowWidthToScreenSize} from '@/lib/window';
import {Router} from '@/Router';

export const Root: FunctionComponent = () => {
    const screenSize = useViewportScreenSize();
    const setScreenSize = useViewportSetScreenSize();
    const setIsMostLikelyMobile = useViewportSetIsMostLikelyMobile();
    const setViewportState = useViewportSetViewportState();

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
            <HelmetProvider>
                <Router />
            </HelmetProvider>
        </QueryClientProvider>
    );
};
