import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CommonActions, useNavigation, useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

import { useApp } from '../../contexts/app';
import { IQuestao } from '../../entities/questao';
import { IQuestoesCategorias } from '../../interface';
import { questoesCategorias } from '../../questoesCategorias';

import { HorizontalLine } from '../../components/layout/line';
import { Spacer } from '../../components/layout/spacer';
import { P, Title2, Title4 } from '../../components/text/text';

import { pickerPrimary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgEdit from '../../assets/svg/svg-edit.svg';
import SvgTrash from '../../assets/svg/svg-trash.svg';

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

    // CONTEXT
    const { setStateLoader } = useApp();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    // STATE
    const [stateQuestoes, setStateQuestoes] = useState<IQuestao[]>([]);
    const [stateSelectedItem, setStateSelectedItem] = useState(null);

    // FUNCTION
    const listarQuestoes = useCallback(
        async (categoria: string): Promise<void> => {
            try {
                setStateLoader(true);

                await firestore()
                    .collection(`questoes${categoria.toLowerCase()}`)
                    .get()
                    .then((querySnapshot: Record<string, any>) => {
                        const questoesArray: IQuestao[] = [];

                        querySnapshot.forEach((documentSnapshot: any) => {
                            questoesArray.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
                        });

                        setStateQuestoes(questoesArray);
                    });
            } catch (err: any) {
                console.error(err);
            } finally {
                setStateLoader(false);
            }
        },
        [setStateLoader]
    );

    const removerQuestao = (id: any): void => {
        if (stateSelectedItem) {
            const questao = async (): Promise<void> => {
                try {
                    setStateLoader(true);

                    await firestore()
                        .collection(`questoes${(stateSelectedItem as string).toLowerCase()}`)
                        .doc(id)
                        .delete()
                        .then(() => {
                            listarQuestoes(stateSelectedItem).catch((err: any) => console.error(err));

                            Alert.alert('Quest??o removida!', '', [
                                {
                                    text: 'Fechar',
                                    onPress: (): void => navigation.dispatch(CommonActions.navigate({ name: 'Quest??es Listar' }))
                                }
                            ]);
                        });
                } catch (err: any) {
                    console.error(err);
                } finally {
                    setStateLoader(false);
                }
            };

            questao().catch((err: any) => console.error(err));
        }
    };

    // DATA
    useEffect(() => {
        setStateSelectedItem(null);

        return undefined;
    }, [isFocused]);

    useEffect(() => {
        if (stateSelectedItem) {
            listarQuestoes(stateSelectedItem).catch((err: any) => console.error(err));
        } else {
            setStateQuestoes([]);
        }

        return undefined;
    }, [listarQuestoes, stateSelectedItem]);

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoesListar}>
                    <Title2>Quest??es</Title2>

                    <Spacer />

                    <Title4>Selecione a categoria:</Title4>

                    <Spacer />

                    <View style={pickerPrimary.containerStyle}>
                        <Picker onValueChange={(itemValue): void => setStateSelectedItem(itemValue)} selectedValue={stateSelectedItem}>
                            <Picker.Item label="Selecione" value="" />

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

                    {stateQuestoes.length > 0 ? (
                        <View style={styles.questoes}>
                            {stateQuestoes
                                .sort((a, b) => {
                                    return (a.numeroquestao || 0) - (b.numeroquestao || 0);
                                })
                                .map(({ catquestao, id, questao }: IQuestao) => {
                                    return (
                                        <View key={id}>
                                            <Spacer />

                                            <View style={styles.questao}>
                                                <View style={styles.questaoTitle}>
                                                    <P>{questao.length > 70 ? `${questao.substring(0, 70)}...` : questao}</P>
                                                </View>

                                                <View style={styles.questaoBotoes}>
                                                    <TouchableOpacity
                                                        onPress={(): any =>
                                                            navigation.dispatch(
                                                                CommonActions.navigate({
                                                                    name: 'Quest??o Editar',
                                                                    params: { categoria: catquestao, id: id }
                                                                })
                                                            )
                                                        }
                                                    >
                                                        <SvgEdit height="25px" width="25px" fill={variable.colorPrimary} />
                                                    </TouchableOpacity>

                                                    <Spacer width={15} />

                                                    <TouchableOpacity onPress={(): any => removerQuestao(id)}>
                                                        <SvgTrash height="25px" width="25px" fill={variable.colorPrimary} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <Spacer />

                                            <HorizontalLine />
                                        </View>
                                    );
                                })}
                        </View>
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestoesListar;
