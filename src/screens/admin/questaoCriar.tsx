import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';

import Yup from '../../helpers/yup';
import { IFormQuestao } from '../../interface';

import { InputDefault } from '../../components/form/form';
import { Spacer } from '../../components/layout/spacer';
import { Title2 } from '../../components/text/text';

import { button } from '../../styles/button';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgCheckboxMark from '../../assets/svg/svg-checkbox-mark.svg';
import SvgCheckboxUnmark from '../../assets/svg/svg-checkbox-unmark.svg';

function QuestaoCriar(): ReactElement {
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
        alternativa: {
            flexDirection: 'row'
        },
        alternativaCampo: {
            width: '85%'
        },
        alternativaCheckbox: {
            paddingTop: 12,
            width: '15%'
        },
        form: {
            backgroundColor: variable.colorWhite,
            paddingHorizontal: 10
        },
        questaoCriar: {
            minHeight: Dimensions.get('window').height - 100 - variable.headerHeight - variable.footerHeight,
            justifyContent: 'flex-start'
        }
    });

    // CONTEXT
    const route: Record<string, any> = useRoute();

    // REF
    const formRef = useRef<FormHandles>(null);

    // STATE
    const [stateAlternativaCerta, setStateAlternativaCerta] = useState('');

    // DATA
    useEffect(() => {
        if (route.params?.categoria && route.params?.id) {
            const questoes = async (): Promise<void> => {
                await firestore()
                    .collection(`questoes${(route.params?.categoria as string).toLowerCase()}`)
                    .orderBy('numeroquestao', 'desc')
                    .limit(1)
                    .get()
                    .then((querySnapshot: Record<string, any>) => {
                        querySnapshot.forEach((documentSnapshot: any) => {
                            console.log('> ', documentSnapshot.data().numeroquestao);
                        });
                    });
            };

            questoes().catch((err: any) => console.error(err));
        }

        return undefined;
    }, [route.params?.categoria, route.params?.id]);

    // FORM
    const handleSubmit: SubmitHandler<IFormQuestao> = async (data) => {
        try {
            const schema = Yup.object().shape({
                alt1: Yup.string().required(),
                alt2: Yup.string().required(),
                alt3: Yup.string().required(),
                alt4: Yup.string().required(),
                alt5: Yup.string().required(),
                questao: Yup.string().required()
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
                <View style={styles.questaoCriar}>
                    <Title2>Questão Criar</Title2>

                    <Spacer />

                    <View style={styles.form}>
                        <Spacer height={10} />

                        <Form initialData={initialData} onSubmit={handleSubmit} ref={formRef}>
                            <View>
                                <View>
                                    <InputDefault maxLength={1000} multiline={true} name="questao" placeholder="Questão" />
                                </View>
                            </View>

                            <View style={styles.alternativa}>
                                <View style={styles.alternativaCheckbox}>
                                    <TouchableOpacity onPress={(): any => setStateAlternativaCerta('alt1')}>
                                        {stateAlternativaCerta === 'alt1' ? (
                                            <SvgCheckboxMark height="30px" width="30px" fill={variable.colorPrimary} />
                                        ) : (
                                            <SvgCheckboxUnmark height="30px" width="30px" fill={variable.colorPrimary} />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.alternativaCampo}>
                                    <InputDefault name="alt1" placeholder="Alternativa 1" />
                                </View>
                            </View>

                            <View style={styles.alternativa}>
                                <View style={styles.alternativaCheckbox}>
                                    <TouchableOpacity onPress={(): any => setStateAlternativaCerta('alt2')}>
                                        {stateAlternativaCerta === 'alt2' ? (
                                            <SvgCheckboxMark height="30px" width="30px" fill={variable.colorPrimary} />
                                        ) : (
                                            <SvgCheckboxUnmark height="30px" width="30px" fill={variable.colorPrimary} />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.alternativaCampo}>
                                    <InputDefault name="alt2" placeholder="Alternativa 2" />
                                </View>
                            </View>

                            <View style={styles.alternativa}>
                                <View style={styles.alternativaCheckbox}>
                                    <TouchableOpacity onPress={(): any => setStateAlternativaCerta('alt3')}>
                                        {stateAlternativaCerta === 'alt3' ? (
                                            <SvgCheckboxMark height="30px" width="30px" fill={variable.colorPrimary} />
                                        ) : (
                                            <SvgCheckboxUnmark height="30px" width="30px" fill={variable.colorPrimary} />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.alternativaCampo}>
                                    <InputDefault name="alt3" placeholder="Alternativa 3" />
                                </View>
                            </View>

                            <View style={styles.alternativa}>
                                <View style={styles.alternativaCheckbox}>
                                    <TouchableOpacity onPress={(): any => setStateAlternativaCerta('alt4')}>
                                        {stateAlternativaCerta === 'alt4' ? (
                                            <SvgCheckboxMark height="30px" width="30px" fill={variable.colorPrimary} />
                                        ) : (
                                            <SvgCheckboxUnmark height="30px" width="30px" fill={variable.colorPrimary} />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.alternativaCampo}>
                                    <InputDefault name="alt4" placeholder="Alternativa 4" />
                                </View>
                            </View>

                            <View style={styles.alternativa}>
                                <View style={styles.alternativaCheckbox}>
                                    <TouchableOpacity onPress={(): any => setStateAlternativaCerta('alt5')}>
                                        {stateAlternativaCerta === 'alt5' ? (
                                            <SvgCheckboxMark height="30px" width="30px" fill={variable.colorPrimary} />
                                        ) : (
                                            <SvgCheckboxUnmark height="30px" width="30px" fill={variable.colorPrimary} />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.alternativaCampo}>
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

export default QuestaoCriar;
