import React, { ReactElement, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import { IQuestao } from '../../entities/questao';

import { Spacer } from '../../components/layout/spacer';
import { P, Span, Title2, Title4 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgInvalid from '../../assets/svg/svg-invalid.svg';
import SvgValid from '../../assets/svg/svg-valid.svg';

function RespostaQuestao({ Alt, Altc, Altn, Alts }: any): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questao: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });

    return (
        <View style={styles.questao}>
            {Alt === Alts ? (
                Altc === Alts ? (
                    <SvgValid height="16px" width="18px" fill={variable.colorSuccess} stroke={variable.colorSuccess} />
                ) : (
                    <SvgInvalid height="16px" width="18px" fill={variable.colorError} stroke={variable.colorError} />
                )
            ) : null}

            <Span bold={true}>{`Alternativa ${Altn as number}: `}</Span>

            <Span bold={Alt === Alts} color={Alt === Alts ? (Altc === Alts ? variable.colorSuccess : variable.colorError) : variable.fontColor}>
                {Alt}
            </Span>
        </View>
    );
}

function Resultado(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        questao: {
            flexDirection: 'row',
            flexWrap: 'wrap'
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
    const [stateQuestoesRespostas, setStateQuestoesRespostas] = useState<IQuestao[]>([]);

    useEffect(() => {
        if (route.params?.questoes) {
            setStateQuestoesRespostas(route.params?.questoes);
        }

        return undefined;
    }, [route.params?.questoes]);

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.resultado}>
                    <Title2 textAlign="center">QUIZ IT</Title2>

                    <Spacer />

                    <Title4 textAlign="center">Resultado:</Title4>

                    <Spacer />

                    <View style={styles.questoesRespostas}>
                        {stateQuestoesRespostas.map((questaoResposta) => {
                            return (
                                <View key={questaoResposta.numeroquestao}>
                                    <Spacer />

                                    <View style={styles.questao}>
                                        <P bold={true}>Questão</P>
                                        <P>{questaoResposta.questao}</P>
                                    </View>

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
