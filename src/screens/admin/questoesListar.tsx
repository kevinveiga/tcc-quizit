import React, { ReactElement, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

import { IQuestoes } from '../../entities/questoes';
import { IQuestoesCategorias } from '../../interface';

import { HorizontalLine } from '../../components/layout/line';
import { Spacer } from '../../components/layout/spacer';
import { P, Title2, Title4 } from '../../components/text/text';
import { questoesCategorias } from '../../questoesCategorias';

import { pickerPrimary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function QuestoesListar(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questao: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        questaoBotoes: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '20%'
        },
        questaoTitle: {
            width: '80%'
        },
        questoes: {
            backgroundColor: variable.colorWhite,
            borderColor: variable.colorGrayLight,
            borderRadius: variable.borderRadius,
            borderStyle: 'solid',
            borderWidth: 1,
            paddingBottom: 10,
            paddingHorizontal: 15
        },
        questoesListar: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    // STATE
    const [stateQuestoes, setStateQuestoes] = useState<IQuestoes[]>([]);
    const [stateSelectedItem, setStateSelectedItem] = useState(null);

    useEffect(() => {
        if (stateSelectedItem) {
            const questoes = async (): Promise<void> => {
                await firestore()
                    .collection(`questoes${(stateSelectedItem as string).toLowerCase()}`)
                    .get()
                    .then((querySnapshot: Record<string, any>) => {
                        const questoesArray: IQuestoes[] = [];

                        querySnapshot.forEach((documentSnapshot: any) => {
                            questoesArray.push(documentSnapshot.data());
                        });

                        setStateQuestoes(questoesArray);
                    });
            };

            questoes().catch((err: any) => console.error(err));
        }

        return undefined;
    }, [stateSelectedItem]);

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoesListar}>
                    <Title2>Admin</Title2>

                    <Spacer />

                    <Title4>Selecione a categoria:</Title4>

                    <Spacer />

                    <View style={pickerPrimary.containerStyle}>
                        <Picker onValueChange={(itemValue): void => setStateSelectedItem(itemValue)} selectedValue={stateSelectedItem}>
                            {questoesCategorias
                                .sort((a, b) => {
                                    return (a.order || 0) - (b.order || 0);
                                })
                                .map(({ id, name }: IQuestoesCategorias) => {
                                    return <Picker.Item key={id} label={name} value={name} />;
                                })}
                        </Picker>
                    </View>

                    <Spacer />

                    <View style={styles.questoes}>
                        {stateQuestoes
                            .sort((a, b) => {
                                return (a.numeroquestao || 0) - (b.numeroquestao || 0);
                            })
                            .map(({ codquestao, questao }: IQuestoes) => {
                                return (
                                    <View key={codquestao}>
                                        <Spacer />

                                        <View style={styles.questao}>
                                            <View style={styles.questaoTitle}>
                                                <P>{`${questao.substring(0, 70)}...`}</P>
                                            </View>

                                            <View style={styles.questaoBotoes}>
                                                <P>Botoes</P>
                                            </View>
                                        </View>

                                        <Spacer />

                                        <HorizontalLine />
                                    </View>
                                );
                            })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestoesListar;
