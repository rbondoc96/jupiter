import type {Options as MotionOptions} from '@motionone/solid';
import type {JSX} from 'solid-js';

export type AnimatedComponentProps = {
    'anim-initial'?: MotionOptions['initial'];
    'anim-animate'?: MotionOptions['animate'];
    'anim-hover'?: MotionOptions['hover'];
    'anim-press'?: MotionOptions['press'];
    'anim-exit'?: MotionOptions['exit'];
    'anim-variants'?: MotionOptions['variants'];
    'anim-transition'?: MotionOptions['transition'];
};

interface BaseComponentMap {
    a: HTMLAnchorElement;
    div: HTMLDivElement;
    svg: SVGSVGElement;
}

export type BaseComponentProps<TComponentKey extends keyof BaseComponentMap> = 
    JSX.CustomAttributes<BaseComponentMap[TComponentKey]>
        & JSX.HTMLAttributes<BaseComponentMap[TComponentKey]>;
