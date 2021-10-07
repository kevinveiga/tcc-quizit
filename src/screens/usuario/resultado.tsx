import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from 'react-native-elements';

import { Spacer } from '../../components/layout/spacer';
import { Title1, Title3 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function Resultado(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        resultado: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.resultado}>
                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer />

                    <Title3 textAlign="center">Resultado.</Title3>

                    <Spacer height={25} />
                </View>
            </ScrollView>
        </View>
    );
}

export default Resultado;
