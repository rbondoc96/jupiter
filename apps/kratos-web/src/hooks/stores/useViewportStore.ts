import {create} from 'zustand';

import {ScreenSize} from '@/enums/ScreenSize';
import {ViewportState} from '@/enums/ViewportState';
import {checkIfUserAgentIsMobile} from '@/lib/window';

type ViewportStoreData = {
    isMostLikelyMobile: boolean;
    screenSize: ScreenSize;
    viewportState: ViewportState;
    setIsMostLikelyMobile: (isMostLikelyMobile: boolean) => void;
    setScreenSize: (screenSize: ScreenSize) => void;
    setViewportState: (viewportState: ViewportState) => void;
};

export const useViewportStore = create<ViewportStoreData>(set => ({
    isMostLikelyMobile: checkIfUserAgentIsMobile(),
    screenSize: ScreenSize.XS,
    viewportState: ViewportState.Mobile,
    setIsMostLikelyMobile: (isMostLikelyMobile: boolean) => set({isMostLikelyMobile}),
    setScreenSize: (screenSize: ScreenSize) => set({screenSize}),
    setViewportState: (viewportState: ViewportState) => set({viewportState}),
}));

export const useViewportIsMostLikelyMobile = () => useViewportStore(state => state.isMostLikelyMobile);
export const useViewportScreenSize = () => useViewportStore(state => state.screenSize);
export const useViewportViewportState = () => useViewportStore(state => state.viewportState);
export const useViewportSetIsMostLikelyMobile = () => useViewportStore(state => state.setIsMostLikelyMobile);
export const useViewportSetScreenSize = () => useViewportStore(state => state.setScreenSize);
export const useViewportSetViewportState = () => useViewportStore(state => state.setViewportState);
