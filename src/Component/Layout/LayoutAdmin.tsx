import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import { useVerifyAuthentication } from '../../Store/Auth/VerifyAuthentication';

import FooterDefault from './FooterDefault';

import { layout } from '../../Style/Layout';

export default function LayoutAdmin({ children }: PropsWithChildren<any>): ReactElement {
    // Verifica autenticação
    useVerifyAuthentication();

    return (
        <View style={layout.mainDefault}>
            <View style={layout.content}>{children}</View>

            <View style={layout.footerDefault}>
                <FooterDefault />
            </View>
        </View>
    );
}
