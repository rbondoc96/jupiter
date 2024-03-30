import {StyleSheet, Text as ReactPdfText, View} from '@react-pdf/renderer';
import type {Style} from '@react-pdf/types';
import {type FunctionComponent} from 'react';
import {colors} from '@/theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        color: colors.text,
        fontFamily: 'Montserrat',
    },
});

type StyleWithoutLetterSpacing = Omit<Style, 'fontFamily' | 'letterSpacing'>;

type TextProps = {
    children: string;
    letterSpacing?: number;
    style?: StyleWithoutLetterSpacing | StyleWithoutLetterSpacing[];
};

export const Text: FunctionComponent<TextProps> = ({
    children,
    letterSpacing,
    style,
}) => {
    const styleList = Array.isArray(style) ? style : style !== undefined ? [style] : [];

    if (letterSpacing) {
        return (
            <View style={[styles.container, {columnGap: letterSpacing}]}>
                {children.split('').map((letter, index) => (
                    <ReactPdfText key={`${children}-${letter}-${index}`} style={[styles.text, ...styleList]}>
                        {letter}
                    </ReactPdfText>
                ))}
            </View>
        );    
    }

    return (
        <ReactPdfText style={[styles.text, ...styleList]}>
            {children}
        </ReactPdfText>
    );
};
