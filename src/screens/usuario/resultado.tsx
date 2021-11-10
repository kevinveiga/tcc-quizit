import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, PermissionsAndroid, ScrollView, StyleSheet, TouchableOpacity, View, Rationale } from 'react-native';

import { useRoute } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { IQuestao } from '../../entities/questao';

import { HorizontalLine } from '../../components/layout/line';
import { Spacer } from '../../components/layout/spacer';
import { P, Span, Title2, Title4 } from '../../components/text/text';

import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgInvalid from '../../assets/svg/svg-invalid.svg';
import SvgValid from '../../assets/svg/svg-valid.svg';

function RespostaQuestao({ Alt, Altc, Altn, Alts }: any): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        column1: {
            width: '30%'
        },
        column2: {
            width: '60%'
        },
        column3: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingTop: 4,
            width: '10%'
        },
        questao: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });

    return (
        <View style={styles.questao}>
            <View style={styles.column1}>
                <Span bold={true}>{`Alternativa ${Altn as number}: `}</Span>
            </View>

            <View style={styles.column2}>
                <Span bold={Alt === Alts} color={Alt === Alts ? (Altc === Alts ? variable.colorSuccess : variable.colorError) : variable.fontColor}>
                    {Alt}
                </Span>
            </View>

            <View style={styles.column3}>
                {Alt === Alts ? (
                    Altc === Alts ? (
                        <SvgValid height="14px" width="18px" fill={variable.colorSuccess} stroke={variable.colorSuccess} />
                    ) : (
                        <SvgInvalid height="14px" width="18px" fill={variable.colorError} stroke={variable.colorError} />
                    )
                ) : null}
            </View>
        </View>
    );
}

function Resultado(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        export: {
            alignItems: 'center'
        },
        questoesRespostas: {
            backgroundColor: variable.colorWhite,
            borderColor: variable.colorGrayLight,
            borderRadius: variable.borderRadius,
            borderStyle: 'solid',
            borderWidth: 1,
            paddingBottom: 10,
            paddingHorizontal: 15
        },
        resultado: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    // CONTEXT
    const route: Record<string, any> = useRoute();

    // STATE
    const [stateQuestoesHtml, setStateQuestoesHtml] = useState<string>('');
    const [stateQuestoesRespostas, setStateQuestoesRespostas] = useState<IQuestao[]>([]);

    // FUNCTION
    const isPermitted = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                    title: 'Permissão para gravar o arquivo',
                    message: 'O aplicativo precisa de permissão'
                } as Rationale);

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                return false;
            }
        } else {
            return true;
        }
    };

    const createHtml = (questoes: IQuestao[]): string => {
        let questaoHtml = '';

        function verificaQuestao(alt: string, altc: any, altn: number, alts: any): string {
            return `<tr style="color: ${alt === alts ? (altc === alts ? variable.colorSuccess : variable.colorError) : variable.fontColor};"/>
                        <td style="font-weight: 600; width: 20%;">Alternativa ${altn}:</td>
                        <td style="font-weight: ${alt === alts ? 600 : 400}; width: 65%;">${alt}</td>
                        <td style="width: 15%;">${alt === alts ? (altc === alts ? '✔' : 'X') : ''}</td>
                    </tr>`;
        }

        for (let i = 0, l = questoes.length; i < l; i += 1) {
            const questaoObj = questoes[i];

            if (questaoObj) {
                questaoHtml += `
                    <tr><td colspan="3">${questaoObj.questao}</td></tr>
                    ${verificaQuestao(questaoObj.alt1, questaoObj[questaoObj.altc], 1, questaoObj.alts)}
                    ${verificaQuestao(questaoObj.alt2, questaoObj[questaoObj.altc], 2, questaoObj.alts)}
                    ${verificaQuestao(questaoObj.alt3, questaoObj[questaoObj.altc], 3, questaoObj.alts)}
                    ${verificaQuestao(questaoObj.alt4, questaoObj[questaoObj.altc], 4, questaoObj.alts)}
                    ${verificaQuestao(questaoObj.alt5, questaoObj[questaoObj.altc], 5, questaoObj.alts)}
                    <tr>
                        <td colspan="3"><hr /></td>
                    </tr>
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                `;
            }
        }

        return `<h3 style="text-align: center;">Resultado - Quiz IT</h3><table cellpadding="5"><tbody>${questaoHtml}</tbody></table>`;
    };

    const createPDF = async (): Promise<void> => {
        const permitted = await isPermitted();

        if (permitted) {
            const options = {
                html: stateQuestoesHtml,
                fileName: 'quizit-resultado',
                directory: 'Download'
            };

            const file = await RNHTMLtoPDF.convert(options);

            Alert.alert(`Arquivo salvo em ${file.filePath as string}`, '', [
                {
                    text: 'Fechar'
                }
            ]);
        }
    };

    // USEEFFECT
    useEffect(() => {
        if (route.params?.questoes) {
            setStateQuestoesHtml(createHtml(route.params?.questoes));

            setStateQuestoesRespostas(route.params?.questoes);
        }

        return undefined;
    }, [route.params?.questoes]);

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.resultado}>
                    <Title2 textAlign="center">Resultado</Title2>

                    <Spacer />

                    <View style={styles.export}>
                        <TouchableOpacity onPress={(): any => createPDF()}>
                            <Title4 textAlign="center">
                                <Span>Exportar para </Span>
                                <Span bold={true} color={variable.colorRed}>
                                    PDF
                                </Span>
                            </Title4>
                        </TouchableOpacity>

                        <View>
                            <HorizontalLine width={180} />
                        </View>
                    </View>

                    <Spacer />

                    <View style={styles.questoesRespostas}>
                        {stateQuestoesRespostas.map((questaoResposta) => {
                            return (
                                <View key={questaoResposta.numeroquestao}>
                                    <Spacer />

                                    <View>
                                        <P bold={true}>Questão:</P>
                                        <P>{questaoResposta.questao}</P>
                                    </View>

                                    <Spacer />

                                    <RespostaQuestao
                                        Alt={questaoResposta.alt1}
                                        Altc={questaoResposta[questaoResposta.altc]}
                                        Altn={1}
                                        Alts={questaoResposta.alts}
                                    />

                                    <RespostaQuestao
                                        Alt={questaoResposta.alt2}
                                        Altc={questaoResposta[questaoResposta.altc]}
                                        Altn={2}
                                        Alts={questaoResposta.alts}
                                    />

                                    <RespostaQuestao
                                        Alt={questaoResposta.alt3}
                                        Altc={questaoResposta[questaoResposta.altc]}
                                        Altn={3}
                                        Alts={questaoResposta.alts}
                                    />

                                    <RespostaQuestao
                                        Alt={questaoResposta.alt4}
                                        Altc={questaoResposta[questaoResposta.altc]}
                                        Altn={4}
                                        Alts={questaoResposta.alts}
                                    />

                                    <RespostaQuestao
                                        Alt={questaoResposta.alt5}
                                        Altc={questaoResposta[questaoResposta.altc]}
                                        Altn={5}
                                        Alts={questaoResposta.alts}
                                    />

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

export default Resultado;
