import React, { ReactElement } from 'react';
import { ColorValue, StyleSheet } from 'react-native';

import { Text } from 'react-native-elements';

import { variable } from '../../Style/variable';

interface ISpan {
    bold?: boolean;
    children?: number | string;
    color?: ColorValue;
    fontSize?: number;
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

export function Span({ bold = false, children, color, fontSize, textDecorationLine }: ISpan): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textDecorationLine: textDecorationLine
    };

    // As propriedades com valor null, são removidas do objeto, para pegar o valor default do theme
    const newStyleObj = Object.keys(styleObj).reduce((accumulator: any, key: string) => {
        if (color === null && key === 'color') {
            return accumulator;
        }

        if (fontSize === null && key === 'fontSize') {
            return accumulator;
        }

        accumulator[key] = styleObj[key];

        return accumulator;
    }, {});

    const styles = StyleSheet.create({
        span: newStyleObj
    });

    return <Text style={styles.span}>{children}</Text>;
}
