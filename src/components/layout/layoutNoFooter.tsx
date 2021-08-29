import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import { layout } from '../../styles/layout';

export default function LayoutNoFooter({ children }: PropsWithChildren<any>): ReactElement {
    return (
        <View style={layout.mainDefault}>
            <View style={layout.content}>{children}</View>
        </View>
    );
}
