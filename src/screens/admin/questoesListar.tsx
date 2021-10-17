import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Title2 } from '../../components/text/text';

import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function QuestoesListar(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questoesListar: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoesListar}>
                    <Title2>Admin</Title2>
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestoesListar;
