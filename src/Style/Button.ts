import { StyleSheet } from 'react-native';

import { variable } from './variable';

export const button = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: variable.colorSecondary,
        borderRadius: variable.borderRadius,
        borderColor: variable.colorBlackTransparent3,
        borderStyle: 'solid',
        borderWidth: 0.5,
        color: variable.colorWhite,
        height: 60,
        fontSize: 22
    }
});
