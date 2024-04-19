import {ScreenBreakpoint} from '@/enums/ScreenBreakpoint';
import {ScreenSize} from '@/enums/ScreenSize';
import {ViewportState} from '@/enums/ViewportState';

export function resolveViewportState(
    previousSize: ScreenSize,
    currentSize: ScreenSize,
): ViewportState {
    if (previousSize === ScreenSize.MD && currentSize === ScreenSize.LG) {
        return ViewportState.MobileToDesktop;
    }

    if (previousSize === ScreenSize.LG && currentSize === ScreenSize.MD) {
        return ViewportState.DesktopToMobile;
    }

    if (([ScreenSize.LG, ScreenSize.XL, ScreenSize.XXL] as ScreenSize[]).includes(currentSize)) {
        return ViewportState.Desktop;
    }

    return ViewportState.Mobile;
}

export function resolveWindowWidthToScreenSize(): ScreenSize {
    const size = Object.entries(ScreenBreakpoint)
        .find(([_size, breakpoint]) => window.innerWidth <= breakpoint);

    return size !== undefined ? size[0] as ScreenSize : ScreenSize.XXL;
}

export function checkIfUserAgentIsMobile(): boolean {
    return /Android|iPhone/i.test(navigator.userAgent);
}
