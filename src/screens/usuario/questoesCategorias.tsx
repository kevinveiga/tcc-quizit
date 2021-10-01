import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from 'react-native-elements';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { questoesCategorias } from '../../questoesCategorias';
import { IQuestoesCategorias } from '../../interface';

import { Spacer } from '../../components/layout/spacer';
import { Title1, Title3 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function QuestoesCategorias(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questoesCategorias: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    // CONTEXT
    const navigation = useNavigation();

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoesCategorias}>
                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer />

                    <Title3 textAlign="center">Selecione a categoria de questões.</Title3>

                    <Spacer height={25} />

                    {questoesCategorias
                        .sort((a, b) => {
                            return (a.order || 0) - (b.order || 0);
                        })
                        .map(({ id, name }: IQuestoesCategorias) => {
                            return (
                                <View key={id}>
                                    <Spacer />

                                    <Button
                                        buttonStyle={button.buttonPrimary}
                                        onPress={(): any => navigation.dispatch(CommonActions.navigate({ name: 'Questões', params: { name: name } }))}
                                        title={name}
                                        type="solid"
                                    />
                                </View>
                            );
                        })}
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestoesCategorias;
