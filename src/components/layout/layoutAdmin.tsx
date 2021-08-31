import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import { useVerifyAuthentication } from '../../stores/auth/verifyAuthentication';

import { FooterDefault } from './footerDefault';

import { layout } from '../../styles/layout';

export function LayoutAdmin({ children }: PropsWithChildren<any>): ReactElement {
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
