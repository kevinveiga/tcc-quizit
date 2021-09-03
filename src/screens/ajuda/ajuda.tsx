import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Spacer } from '../../components/layout/spacer';
import { Title4 } from '../../components/text/text';

import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function Ajuda(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        ajuda: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    return (
        <View style={{ ...layout.container }}>
            <ScrollView>
                <View style={styles.ajuda}>
                    <Spacer height={25} />

                    <Title4 textAlign="center">Ajuda</Title4>

                    <Spacer />
                </View>
            </ScrollView>
        </View>
    );
}

export default Ajuda;
