import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../components/text/title';

import { layout } from '../../styles/layout';

export default function Admin(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Admin</Title2>
        </View>
    );
}
