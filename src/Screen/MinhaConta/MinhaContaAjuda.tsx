import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Title2 } from '../../Component/Text/Title';

import { layout } from '../../Style/Layout';

export default function MinhaContaAjuda(): ReactElement {
    return (
        <View style={layout.container}>
            <Title2>Ajuda</Title2>
        </View>
    );
}
