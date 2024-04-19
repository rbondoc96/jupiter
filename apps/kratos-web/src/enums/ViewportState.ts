const ViewportState = {
    Mobile: 'mobile',
    MobileToDesktop: 'mobile_to_desktop',
    DesktopToMobile: 'desktop_to_mobile',
    Desktop: 'desktop',
} as const;

type ViewportState = typeof ViewportState[keyof typeof ViewportState];

export {ViewportState};
