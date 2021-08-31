import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';

import { Spacer } from '../../components/layout/spacer';
import { Title4 } from '../../components/text/text';

import { layout } from '../../styles/layout';

function Ajuda(): ReactElement {
    return (
        <View style={{ ...layout.container }}>
            <ScrollView>
                <Spacer height={25} />

                <Title4 textAlign="center">Ajuda</Title4>

                <Spacer />
            </ScrollView>
        </View>
    );
}

export default Ajuda;
