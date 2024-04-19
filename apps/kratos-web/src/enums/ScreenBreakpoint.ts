import ScreenSize from '@/enums/ScreenSize';

const ScreenBreakpoint = {
    [ScreenSize.XS]: 480,
    [ScreenSize.SM]: 640,
    [ScreenSize.MD]: 768,
    [ScreenSize.LG]: 1024,
    [ScreenSize.XL]: 1280,
    [ScreenSize.XXL]: 1536,
} as const satisfies Record<ScreenSize, number>;

type ScreenBreakpoint = (typeof ScreenBreakpoint)[keyof typeof ScreenBreakpoint];

export default ScreenBreakpoint;
