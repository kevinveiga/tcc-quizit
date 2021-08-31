import { StyleSheet } from 'react-native';

import { variable } from './variable';

export const header = StyleSheet.create({
    headerStyle: {
        backgroundColor: variable.colorPrimary,
        height: variable.headerHeight
    },
    headerTitleStyle: {
        color: variable.colorSecondary,
        fontFamily: variable.fontPrimaryBold
    }
});
