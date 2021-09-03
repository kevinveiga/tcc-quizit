import React, { ReactElement, ReactNode } from 'react';
import { ColorValue, StyleSheet } from 'react-native';

import { Text } from 'react-native-elements';

import { variable } from '../../styles/variable';

interface IP {
    bold?: boolean;
    children?: number | string;
    color?: ColorValue;
    fontSize?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

interface ISpan {
    bold?: boolean;
    children?: number | string;
    color?: ColorValue;
    fontSize?: number;
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

interface ITitle {
    bold?: boolean;
    children?: number | ReactNode | string;
    color?: ColorValue;
    fontSize?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

export function P({ bold = false, children, color, fontSize, textAlign, textDecorationLine }: IP): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign,
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
        p: newStyleObj
    });

    return <Text style={styles.p}>{children}</Text>;
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

export function Title1({ bold = true, children, color, fontSize = 32, textAlign, textDecorationLine }: ITitle): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign,
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
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

export function Title2({ bold = true, children, color, fontSize = 26, textAlign = 'left' }: ITitle): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign
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
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

export function Title3({ bold = false, children, color, fontSize = 22, textAlign = 'left' }: ITitle): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign
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
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}

export function Title4({ bold = false, children, color, fontSize = 18, textAlign = 'left' }: ITitle): ReactElement {
    const styleObj: { [key: string]: any } = {
        color: color,
        fontFamily: bold ? variable.fontPrimaryBold : variable.fontPrimaryRegular,
        fontSize: fontSize,
        textAlign: textAlign
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
        title: newStyleObj
    });

    return <Text style={styles.title}>{children}</Text>;
}
