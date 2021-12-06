import React, { ReactElement } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from 'react-native-elements';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { questoesCategorias } from '../../questoesCategorias';
import { IQuestoesCategorias } from '../../interface';

import { Spacer } from '../../components/layout/spacer';
import { Title2, Title4 } from '../../components/text/text';

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
                    <Title2 textAlign="center">Categorias</Title2>

                    <Spacer />

                    <Title4 textAlign="center">Selecione a categoria de questões:</Title4>

                    <Spacer />

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
                                        onPress={(): any =>
                                            navigation.dispatch(CommonActions.navigate({ name: 'Questões', params: { nameCategoria: name } }))
                                        }
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
