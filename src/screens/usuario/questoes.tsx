import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Spacer } from '../../components/layout/spacer';
import { Title1, Title2 } from '../../components/text/text';

import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function Questoes(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questoes: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoes}>
                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer />

                    <Title2>Questões 1 de 10 - BI.</Title2>

                    <Spacer height={25} />
                </View>
            </ScrollView>
        </View>
    );
}

export default Questoes;
