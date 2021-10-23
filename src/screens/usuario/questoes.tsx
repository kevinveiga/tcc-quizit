import React, { ReactElement, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { IQuestao } from '../../entities/questao';
import { IInputRadioItems } from '../../interface';

import { Spacer } from '../../components/layout/spacer';
import { P, Title1, Title3 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function Questoes(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questaoNavegacao: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 250
        },
        questoes: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        },
        respostas: {
            alignItems: 'center'
        },
        respostaRadioButton: {
            marginVertical: 5,
            width: 350
        },
        respostaRadioLabel: {
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
            marginRight: 35
        }
    });

    // VARIABLE
    const initialValueRespostaSelecionada = { value: '', valueIndex: -1 };

    // CONTEXT
    const route: Record<string, any> = useRoute();
    const navigation = useNavigation();

    // STATE
    const [stateQuestaoAtual, setStateQuestaoAtual] = useState<Record<string, any>>();
    const [stateQuestaoAtualNumero, setStateQuestaoAtualNumero] = useState(1);
    const [stateQuestoes, setStateQuestoes] = useState<IQuestao[]>([]);
    const [stateQuestoesTotal, setStateQuestoesTotal] = useState(0);
    const [stateRespostas, stateSetRadioItems] = useState<IInputRadioItems[]>([]);
    const [stateRespostaSelecionada, stateSetRespostaSelecionada] = useState(initialValueRespostaSelecionada);

    // DATA
    useEffect(() => {
        if (route.params?.name) {
            const questoes = async (): Promise<void> => {
                await firestore()
                    .collection(`questoes${(route.params?.name as string).toLowerCase()}`)
                    .get()
                    .then((querySnapshot: Record<string, any>) => {
                        setStateQuestoesTotal(querySnapshot.size);

                        const questoesArray: IQuestao[] = [];

                        querySnapshot.forEach((documentSnapshot: any) => {
                            questoesArray.push(documentSnapshot.data());
                        });

                        setStateQuestoes(questoesArray);
                    });
            };

            questoes().catch((err: any) => console.error(err));

            const respostas = async (): Promise<void> => {
                await firestore()
                    .collection(`questoes${(route.params?.name as string).toLowerCase()}`)
                    .where('numeroquestao', '==', stateQuestaoAtualNumero)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((documentSnapshot: any) => {
                            if (documentSnapshot?.data()) {
                                const respostasArray: any = [];

                                for (const key in documentSnapshot.data()) {
                                    if (key.startsWith('alt') && key !== 'altc') {
                                        respostasArray.push({ id: key, label: documentSnapshot.data()[key], value: documentSnapshot.data()[key] });
                                    }
                                }

                                stateSetRadioItems(respostasArray);

                                setStateQuestaoAtual(documentSnapshot.data());
                            }
                        });
                    });
            };

            respostas().catch((err: any) => console.error(err));
        }

        return undefined;
    }, [route.params?.name, stateQuestaoAtualNumero]);

    // FUNCTION
    const questaoAnterior = (): void => {
        setStateQuestaoAtualNumero(stateQuestaoAtualNumero - 1);
        stateSetRespostaSelecionada(initialValueRespostaSelecionada);
    };

    const questaoProxima = (): void => {
        setStateQuestaoAtualNumero(stateQuestaoAtualNumero + 1);
        stateSetRespostaSelecionada(initialValueRespostaSelecionada);
    };

    const resultado = (): void => {
        // TODO
        navigation.dispatch(CommonActions.navigate({ name: 'Resultado', params: { questoes: null } }));
    };

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoes}>
                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer />

                    <Title3 textAlign="center">
                        Questão {stateQuestaoAtualNumero} de {stateQuestoesTotal} - {route.params?.name}.
                    </Title3>

                    <Spacer />

                    {stateQuestaoAtual ? (
                        <View style={styles.respostas}>
                            <P>{stateQuestaoAtual.questao}</P>

                            <Spacer />

                            <View>
                                <RadioForm>
                                    {stateRespostas.map(({ id, label, value }: IInputRadioItems, index) => {
                                        const onPress = (v: string, i: number): any => {
                                            stateSetRespostaSelecionada({ value: v, valueIndex: i });
                                        };

                                        return (
                                            <RadioButton key={id} wrapStyle={styles.respostaRadioButton}>
                                                <RadioButtonInput
                                                    buttonOuterSize={30.6}
                                                    buttonSize={13}
                                                    index={index}
                                                    isSelected={stateRespostaSelecionada.valueIndex === index}
                                                    obj={{ label: label, value: value }}
                                                    onPress={onPress}
                                                />

                                                <RadioButtonLabel
                                                    index={index}
                                                    labelStyle={styles.respostaRadioLabel}
                                                    obj={{ label: label, value: value }}
                                                    onPress={onPress}
                                                />
                                            </RadioButton>
                                        );
                                    })}
                                </RadioForm>
                            </View>

                            <Spacer height={25} />

                            <View style={styles.questaoNavegacao}>
                                {stateQuestaoAtualNumero > 1 && (
                                    <Button buttonStyle={button.buttonPrimary} onPress={(): any => questaoAnterior()} title="Anterior" type="solid" />
                                )}

                                {stateQuestaoAtualNumero < stateQuestoesTotal && (
                                    <Button buttonStyle={button.buttonPrimary} onPress={(): any => questaoProxima()} title="Próxima" type="solid" />
                                )}

                                {stateQuestaoAtualNumero === stateQuestoesTotal && (
                                    <Button buttonStyle={button.buttonPrimary} onPress={(): any => resultado()} title="Finalizar" type="solid" />
                                )}
                            </View>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default Questoes;
