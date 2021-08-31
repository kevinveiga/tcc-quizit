import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Spacer } from '../../components/layout/spacer';
import { Title4 } from '../../components/text/title';

import { layout } from '../../styles/layout';

function Home(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        homeTop: {
            width: '100%'
        },
        login: {
            width: '100%'
        }
    });

    return (
        <View style={{ ...layout.container, ...styles.homeTop }}>
            <ScrollView>
                <Spacer height={25} />

                <Title4 textAlign="center">QUIZ IT</Title4>

                <Spacer />
            </ScrollView>
        </View>
    );
}

export default Home;
