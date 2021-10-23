import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';

import { IQuestao } from '../../entities/questao';
import Yup from '../../helpers/yup';
import { IFormQuestao } from '../../interface';

import { InputDefault } from '../../components/form/form';
import { Spacer } from '../../components/layout/spacer';
import { Title2 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

function QuestaoEditar(): ReactElement {
    // VARIABLE
    const initialData: IFormQuestao = {
        alt1: '',
        alt2: '',
        alt3: '',
        alt4: '',
        alt5: '',
        altc: '',
        questao: ''
    };

    // STYLE
    const styles = StyleSheet.create({
        form: {
            backgroundColor: variable.colorWhite,
            paddingHorizontal: 10
        },
        questaoEditar: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    // CONTEXT
    const route: Record<string, any> = useRoute();

    // STATE
    const [stateQuestao, setStateQuestao] = useState<IQuestao>();

    // DATA
    useEffect(() => {
        if (route.params?.categoria && route.params?.id) {
            const questoes = async (): Promise<void> => {
                await firestore()
                    .collection(`questoes${(route.params?.categoria as string).toLowerCase()}`)
                    .doc((route.params?.id as string).toLowerCase())
                    .get()
                    .then((documentSnapshot: Record<string, any>) => {
                        if (documentSnapshot.exists) {
                            setStateQuestao(documentSnapshot.data());
                        }
                    });
            };

            questoes().catch((err: any) => console.error(err));
        }

        return undefined;
    }, [route.params?.categoria, route.params?.id]);

    // FORM
    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<IFormQuestao> = async (data) => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required()
            });

            await schema
                .validate(data, {
                    abortEarly: false
                })
                .then(() => {
                    // actions?.login(data).catch((loginError) => Alert.alert('Erro:', loginError.toString(), [{ text: 'Fechar' }]));
                });

            formRef.current?.setErrors({});
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages: { [key: string]: any } = {};

                err.inner.forEach((item: any) => {
                    errorMessages[item.path] = item.message;
                });

                formRef.current?.setErrors(errorMessages);
            }
        }
    };

    return (
        <View style={layout.container}>
            <ScrollView>
                <View style={styles.questaoEditar}>
                    <Title2>Questão Editar</Title2>

                    <Spacer />

                    <View style={styles.form}>
                        <Spacer height={10} />

                        <Form initialData={initialData} onSubmit={handleSubmit} ref={formRef}>
                            <View>
                                <View>
                                    <InputDefault multiline={true} name="questao" placeholder="Questão" />
                                </View>
                            </View>

                            <View>
                                <View>
                                    <InputDefault name="alt1" placeholder="Alternativa 1" />
                                </View>
                            </View>

                            <View>
                                <View>
                                    <InputDefault name="alt2" placeholder="Alternativa 2" />
                                </View>
                            </View>

                            <View>
                                <View>
                                    <InputDefault name="alt3" placeholder="Alternativa 3" />
                                </View>
                            </View>

                            <View>
                                <View>
                                    <InputDefault name="alt4" placeholder="Alternativa 4" />
                                </View>
                            </View>

                            <View>
                                <View>
                                    <InputDefault name="alt5" placeholder="Alternativa 5" />
                                </View>
                            </View>

                            <View>
                                <Button
                                    buttonStyle={button.buttonPrimary}
                                    onPress={(): any => formRef.current?.submitForm()}
                                    title="Editar"
                                    type="solid"
                                />
                            </View>
                        </Form>

                        <Spacer height={10} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestaoEditar;
