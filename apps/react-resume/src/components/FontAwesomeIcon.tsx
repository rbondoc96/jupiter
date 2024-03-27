/**
 * The code used to create this component is from:
 * https://github.com/diegomura/react-pdf/discussions/1334
 */

import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Path, Svg, type ViewProps} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';

type FontAwesomeIconProps = {
    icon: IconDefinition;
    style?: ViewProps['style'];
    width: string | number;
};

export const FontAwesomeIcon: FunctionComponent<FontAwesomeIconProps> = ({
    icon: {icon},
    style,
    width,
}) => {
    const duotone = Array.isArray(icon[4]);
    const paths = Array.isArray(icon[4]) ? icon[4] : [icon[4]];
    const color = !Array.isArray(style) ? (style?.color ?? 'black') : undefined;
    const styleList = Array.isArray(style) ? style : style !== undefined ? [style] : [];

    return (
        <Svg viewBox={`0 0 ${icon[0]} ${icon[1]}`} style={[...styleList, {width}]}>
        {paths &&
            paths.map((d, index) => (
                <Path
                    d={d}
                    key={index}
                    fill={color}
                    fillOpacity={duotone && index === 0 ? 0.4 : 1.0}
                />
            ))}
        </Svg>
    );
};
