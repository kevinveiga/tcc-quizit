import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { theme } from './theme';
import { variable } from './variable';

const { Input } = theme;

export interface IInputStyle {
    containerStyle?: StyleProp<ViewStyle | TextStyle>;
    inputContainerStyle?: StyleProp<ViewStyle | TextStyle>;
    inputStyle?: StyleProp<ViewStyle | TextStyle>;
    leftIconContainerStyle?: StyleProp<ViewStyle | TextStyle>;
    rightIconContainerStyle?: StyleProp<ViewStyle | TextStyle>;
}

export const inputPrimary = StyleSheet.create({
    ...Input,
    containerStyle: {
        backgroundColor: variable.colorWhite
    }
});

export const inputSecondary = StyleSheet.create({
    ...Input,
    containerStyle: {
        backgroundColor: 'transparent'
    },
    leftIconContainerStyle: {
        backgroundColor: variable.colorGrayLight3,
        borderBottomColor: variable.colorGrayLight,
        borderBottomWidth: 1,
        borderLeftColor: variable.colorGrayLight,
        borderLeftWidth: 1,
        borderTopColor: variable.colorGrayLight,
        borderTopWidth: 1
    },
    rightIconContainerStyle: {
        backgroundColor: variable.colorGrayLight3,
        borderBottomColor: variable.colorGrayLight,
        borderBottomWidth: 1,
        borderRightColor: variable.colorGrayLight,
        borderRightWidth: 1,
        borderTopColor: variable.colorGrayLight,
        borderTopWidth: 1
    }
});
