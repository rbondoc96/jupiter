import {type Component, mergeProps, splitProps} from 'solid-js';

import type {BaseComponentProps} from '@/components/types';

type SquareOfDotsIconProps = BaseComponentProps<'svg'> & {
    fill?: string;
    size?: number;
};

const SquareOfDotsIcon: Component<SquareOfDotsIconProps> = props => {
    const propsWithDefaults = mergeProps({
        fill: 'white',
        size: 12,
    }, props);
    
    const [localProps, rest] = splitProps(propsWithDefaults, ['fill', 'size']);

    return (
        <svg
            width={localProps.size}
            height={localProps.size}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <circle cx="1.5" cy="1.5" r="1.5" fill={localProps.fill}/>
            <circle cx="10.5" cy="1.5" r="1.5" fill={localProps.fill}/>
            <circle cx="1.5" cy="10.5" r="1.5" fill={localProps.fill}/>
            <circle cx="10.5" cy="10.5" r="1.5" fill={localProps.fill}/>
        </svg>
    );
};

export default SquareOfDotsIcon;
