import React, { ReactElement } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { variable } from '../../Style/variable';

interface ILine {
    bgColor?: ColorValue;
    height?: number | string;
    width?: number | string;
}

export function HorizontalLine({ bgColor = variable.colorGrayLight, height = 1, width = '100%' }: ILine): ReactElement {
    const styles = StyleSheet.create({
        size: {
            backgroundColor: bgColor,
            height: height,
            width: width
        }
    });

    return <View style={styles.size} />;
}

export function VerticalLine({ bgColor = variable.colorGrayLight, height = '100%', width = 1 }: ILine): ReactElement {
    const styles = StyleSheet.create({
        size: {
            backgroundColor: bgColor,
            height: height,
            width: width
        }
    });

    return <View style={styles.size} />;
}
