import { ImageStyle, ViewStyle, TextStyle } from 'react-native';

import { variable } from './variable';

interface ITheme {
    Avatar?: {
        rounded?: boolean;
    };
    Badge?: {
        textStyle?: TextStyle;
    };
    Button?: {
        titleStyle?: TextStyle;
    };
    Card?: {
        containerStyle?: TextStyle | ViewStyle;
    };
    Input?: {
        containerStyle?: ImageStyle | TextStyle | ViewStyle;
        errorStyle?: ImageStyle | TextStyle | ViewStyle;
        inputContainerStyle?: ImageStyle | TextStyle | ViewStyle;
        inputStyle?: ImageStyle | TextStyle | ViewStyle;
        leftIconContainerStyle?: ImageStyle | TextStyle | ViewStyle;
        rightIconContainerStyle?: ImageStyle | TextStyle | ViewStyle;
    };
    Text?: {
        style?: TextStyle;
    };
    colors?: {
        primary?: string;
        secondary?: string;
        white?: string;
        black?: string;
        grey0?: string;
        grey1?: string;
        grey2?: string;
        grey3?: string;
        grey4?: string;
        grey5?: string;
        greyOutline?: string;
        searchBg?: string;
        success?: string;
        error?: string;
        warning?: string;
        divider?: string;
        platform?: {
            ios?: {
                primary?: string;
                secondary?: string;
                grey?: string;
                searchBg?: string;
                success?: string;
                error?: string;
                warning?: string;
            };
            android?: {
                primary?: string;
                secondary?: string;
                grey?: string;
                searchBg?: string;
                success?: string;
                error?: string;
                warning?: string;
            };
            web?: {
                primary?: string;
                secondary?: string;
                grey?: string;
                searchBg?: string;
                success?: string;
                error?: string;
                warning?: string;
            };
        };
    };
}

export const theme: ITheme = {
    // React Elements
    Avatar: {
        rounded: true
    },
    Badge: {
        textStyle: { fontSize: 28 }
    },
    Button: {
        titleStyle: { fontSize: 22 }
    },
    Card: {
        containerStyle: {
            margin: 0
        }
    },
    Input: {
        containerStyle: {
            paddingHorizontal: 0
        },
        errorStyle: {
            fontSize: 12,
            margin: 4
        },
        inputContainerStyle: {
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
            borderRadius: variable.borderRadius,
            overflow: 'hidden'
        },
        inputStyle: {
            backgroundColor: variable.colorWhite,
            borderColor: variable.colorGrayLight,
            borderWidth: 1,
            minHeight: variable.inputHeight,
            padding: 10
        },
        leftIconContainerStyle: {
            marginVertical: 0,
            minHeight: variable.inputHeight,
            paddingLeft: 10,
            paddingRight: 10
        },
        rightIconContainerStyle: {
            marginVertical: 0,
            minHeight: variable.inputHeight,
            paddingLeft: 10,
            paddingRight: 10
        }
    },
    Text: {
        style: {
            fontFamily: variable.fontPrimaryRegular,
            fontSize: variable.fontSize
        }
    },
    // Others
    colors: {
        primary: variable.colorPrimary,
        secondary: variable.colorSecondary
    }
};
