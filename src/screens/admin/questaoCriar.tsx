import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Title2 } from '../../components/text/text';

import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function QuestaoCriar(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questaoCriar: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questaoCriar}>
                    <Title2>Questão Criar</Title2>
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestaoCriar;
