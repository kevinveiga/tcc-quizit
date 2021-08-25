import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { theme } from './Theme';
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
        borderRightColor: variable.colorGrayLight,
        borderRightWidth: 1
    },
    rightIconContainerStyle: {
        backgroundColor: variable.colorGrayLight3,
        borderLeftColor: variable.colorGrayLight,
        borderLeftWidth: 1
    }
});
