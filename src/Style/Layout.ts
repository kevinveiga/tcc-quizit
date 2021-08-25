import { StyleSheet } from 'react-native';

import { variable } from './variable';

export const layout = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    content: {
        flex: 1
    },
    footerDefault: {
        backgroundColor: variable.colorGrayDark,
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        minHeight: variable.footerHeight,
        padding: variable.padding
    },
    loaderWrap: {
        alignItems: 'center',
        backgroundColor: variable.colorBlackTransparent5,
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        zIndex: 10
    },
    mainDefault: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    safeArea: {
        flex: 1
    }
});
