import React, { ReactElement, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { IQuestao } from '../../entities/questao';
import { IInputRadioItems } from '../../interface';

import { Spacer } from '../../components/layout/spacer';
import { P, Title2, Title4 } from '../../components/text/text';

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
    const [stateRadioItems, setStateRadioItems] = useState<IInputRadioItems[]>([]);
    const [stateRespostaSelecionada, setStateRespostaSelecionada] = useState(initialValueRespostaSelecionada);

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
        }

        return undefined;
    }, [route.params?.name]);

    useEffect(() => {
        if (route.params?.name) {
            const respostas = async (): Promise<void> => {
                await firestore()
                    .collection(`questoes${(route.params?.name as string).toLowerCase()}`)
                    .where('numeroquestao', '==', stateQuestaoAtualNumero)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((documentSnapshot: any) => {
                            if (documentSnapshot?.data()) {
                                const obj = documentSnapshot.data();

                                const alternativasArray = Object.keys(obj)
                                    .filter((key) => {
                                        return key === 'alt1' || key === 'alt2' || key === 'alt3' || key === 'alt4' || key === 'alt5';
                                    })
                                    .sort((a: any, b: any) => {
                                        return a.localeCompare(b, 'br');
                                    })
                                    .map((key) => {
                                        const alternativa = obj[key];

                                        return { id: key, label: alternativa, value: alternativa };
                                    });

                                setStateRadioItems(alternativasArray);

                                setStateQuestaoAtual(obj);
                            }
                        });
                    });
            };

            respostas().catch((err: any) => console.error(err));
        }

        return undefined;
    }, [route.params?.name, stateQuestaoAtualNumero]);

    // FUNCTION
    const respostas = (newQuestaoAtualNumero: number): IQuestao[] => {
        const respostaSelecionada = stateRespostaSelecionada.value;

        const questoes = stateQuestoes.map((questao) => {
            if (questao.numeroquestao === stateQuestaoAtualNumero) {
                questao = { ...questao, alts: respostaSelecionada };
            }

            return questao;
        });

        setStateQuestaoAtualNumero(newQuestaoAtualNumero);
        setStateRespostaSelecionada(initialValueRespostaSelecionada);

        return questoes;
    };

    const questaoAnterior = (): void => {
        setStateQuestoes(respostas(stateQuestaoAtualNumero - 1));
    };

    const questaoProxima = (): void => {
        setStateQuestoes(respostas(stateQuestaoAtualNumero + 1));
    };

    const resultado = (): void => {
        navigation.dispatch(CommonActions.navigate({ name: 'Resultado', params: { questoes: respostas(1) } }));
    };

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questoes}>
                    <Title2 textAlign="center">
                        Questão {stateQuestaoAtualNumero} de {stateQuestoesTotal} - {route.params?.name}
                    </Title2>

                    <Spacer />

                    <Title4 textAlign="center">Selecione a alternativa correta</Title4>

                    <Spacer />

                    {stateQuestaoAtual ? (
                        <View style={styles.respostas}>
                            <P>{stateQuestaoAtual.questao}</P>

                            <Spacer />

                            <View>
                                <RadioForm>
                                    {stateRadioItems.map(({ id, label, value }: IInputRadioItems, index) => {
                                        const onPress = (v: string, i: number): any => {
                                            setStateRespostaSelecionada({ value: v, valueIndex: i });
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
                                    <Button
                                        buttonStyle={button.buttonPrimary}
                                        disabled={stateRespostaSelecionada.valueIndex === -1}
                                        onPress={(): any => questaoProxima()}
                                        title="Próxima"
                                        type="solid"
                                    />
                                )}

                                {stateQuestaoAtualNumero === stateQuestoesTotal && (
                                    <Button buttonStyle={button.buttonPrimary} onPress={(): any => resultado()} title="Resultado" type="solid" />
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
