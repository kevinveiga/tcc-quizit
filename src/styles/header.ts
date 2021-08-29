import { StyleSheet } from 'react-native';

import { variable } from './variable';

export const header = StyleSheet.create({
    headerStyle: {
        backgroundColor: variable.colorPrimary,
        minHeight: variable.headerHeight,
        padding: variable.padding
    },
    headerTitleStyle: {
        color: variable.colorSecondary,
        fontFamily: variable.fontPrimaryBold
    }
});
