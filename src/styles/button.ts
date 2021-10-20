import { StyleSheet } from 'react-native';

import { variable } from './variable';

export const button = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: variable.colorSecondary,
        borderColor: variable.colorBlackTransparent3,
        borderRadius: variable.borderRadius,
        borderStyle: 'solid',
        borderWidth: 0.5,
        color: variable.colorWhite,
        fontSize: 22,
        height: 60
    }
});
