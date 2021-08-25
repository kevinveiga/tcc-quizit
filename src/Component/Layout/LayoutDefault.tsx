import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import FooterDefault from './FooterDefault';

import { layout } from '../../Style/Layout';

export default function LayoutDefault({ children }: PropsWithChildren<any>): ReactElement {
    return (
        <View style={layout.mainDefault}>
            <View style={layout.content}>{children}</View>

            <View style={layout.footerDefault}>
                <FooterDefault />
            </View>
        </View>
    );
}
