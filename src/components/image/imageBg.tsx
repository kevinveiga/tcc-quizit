import React, { ReactElement, ReactNode } from 'react';
import { FlexAlignType, ImageBackground, ImageResizeMode, ImageSourcePropType, StyleSheet } from 'react-native';

interface IImageBg {
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
    alignItems?: FlexAlignType;
    children?: ReactNode;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    resizeMode?: ImageResizeMode;
    source: ImageSourcePropType;
}

export function ImageBg({
    alignContent = 'flex-start',
    alignItems = 'flex-start',
    children,
    flexDirection = 'column',
    justifyContent = 'center',
    resizeMode = 'cover',
    source
}: IImageBg): ReactElement {
    const styles = StyleSheet.create({
        imageBg: {
            alignContent: alignContent,
            alignItems: alignItems,
            flex: 1,
            flexDirection: flexDirection,
            resizeMode: resizeMode,
            justifyContent: justifyContent
        }
    });

    return (
        <ImageBackground source={source} style={styles.imageBg}>
            {children}
        </ImageBackground>
    );
}
