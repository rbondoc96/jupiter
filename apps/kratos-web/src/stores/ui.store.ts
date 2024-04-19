import {create} from 'zustand';

import ScreenSize from '@/enums/ScreenSize';
import ViewportState from '@/enums/ViewportState';
import {checkIfUserAgentIsMobile} from '@/lib/window';

type UiStore = {
    isMostLikelyMobile: boolean;
    screenSize: ScreenSize;
    viewportState: ViewportState;
    setIsMostLikelyMobile: (value: boolean) => void;
    setScreenSize: (value: ScreenSize) => void;
    setViewportState: (value: ViewportState) => void;
};

const uiStore = create<UiStore>(set => ({
    isMostLikelyMobile: checkIfUserAgentIsMobile(),
    screenSize: ScreenSize.XS,
    viewportState: ViewportState.Mobile,
    setIsMostLikelyMobile: (isMostLikelyMobile: boolean) => set({isMostLikelyMobile}),
    setScreenSize: (screenSize: ScreenSize) => set({screenSize}),
    setViewportState: (viewportState: ViewportState) => set({viewportState}),
}));

const selectIsMostLikelyMobile = (state: UiStore) => state.isMostLikelyMobile;
const selectScreenSize = (state: UiStore) => state.screenSize;
const selectViewportState = (state: UiStore) => state.viewportState;
const selectSetIsMostLikelyMobile = (state: UiStore) => state.setIsMostLikelyMobile;
const selectSetScreenSize = (state: UiStore) => state.setScreenSize;
const selectSetViewportState = (state: UiStore) => state.setViewportState;

export const useIsMostLikelyMobile: () => UiStore['isMostLikelyMobile'] = () => uiStore(selectIsMostLikelyMobile);
export const useScreenSize: () => UiStore['screenSize'] = () => uiStore(selectScreenSize);
export const useViewportState: () => UiStore['viewportState'] = () => uiStore(selectViewportState);
export const useSetIsMostLikelyMobile: () => UiStore['setIsMostLikelyMobile'] =
    () => uiStore(selectSetIsMostLikelyMobile);
export const useSetScreenSize: () => UiStore['setScreenSize'] = () => uiStore(selectSetScreenSize);
export const useSetViewportState: () => UiStore['setViewportState'] =
    () => uiStore(selectSetViewportState);

export default uiStore;
