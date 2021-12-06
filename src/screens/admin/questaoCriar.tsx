import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';

import { useApp } from '../../contexts/app';
import Yup from '../../helpers/yup';
import { IFormQuestao, IQuestoesCategorias } from '../../interface';
import { questoesCategorias } from '../../questoesCategorias';

import { InputDefault } from '../../components/form/form';
import { Spacer } from '../../components/layout/spacer';
import { Span, Title2, Title4 } from '../../components/text/text';

import { button } from '../../styles/button';
import { pickerPrimary } from '../../styles/form';
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
        alternativaCheckboxTitulo: {
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

    // REF
    const formRef = useRef<FormHandles>(null);

    // CONTEXT
    const { setStateLoader } = useApp();
    const navigation = useNavigation();

    // STATE
    const [stateAlternativaCerta, setStateAlternativaCerta] = useState('');
    const [stateUltimoNumeroQuestao, setStateUltimoNumeroQuestao] = useState(0);
    const [stateSelectedItem, setStateSelectedItem] = useState(null);

    // DATA
    useEffect(() => {
        if (stateSelectedItem) {
            const questoes = async (): Promise<void> => {
                try {
                    setStateLoader(true);

                    await firestore()
                        .collection(`questoes${(stateSelectedItem as string).toLowerCase()}`)
                        .orderBy('numeroquestao', 'desc')
                        .limit(1)
                        .get()
                        .then((querySnapshot: Record<string, any>) => {
                            querySnapshot.forEach((documentSnapshot: any) => {
                                setStateUltimoNumeroQuestao(documentSnapshot.data().numeroquestao);
                            });
                        });
                } catch (err: any) {
                    console.error(err);
                } finally {
                    setStateLoader(false);
                }
            };

            questoes().catch((err: any) => console.error(err));
        }

        return undefined;
    }, [stateSelectedItem, setStateLoader]);

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
                    const altc = stateAlternativaCerta;
                    const categoria = stateSelectedItem;
                    const newData = { ...data, altc: altc };
                    const ultimoNumeroQuestao = stateUltimoNumeroQuestao + 1;

                    if (categoria) {
                        const questaoInserir = async (): Promise<void> => {
                            try {
                                setStateLoader(true);

                                await firestore()
                                    .collection(`questoes${(categoria as string).toLowerCase()}`)
                                    .add({
                                        alt1: newData.alt1,
                                        alt2: newData.alt2,
                                        alt3: newData.alt3,
                                        alt4: newData.alt4,
                                        alt5: newData.alt5,
                                        altc: newData.altc,
                                        catquestao: categoria,
                                        numeroquestao: ultimoNumeroQuestao,
                                        questao: newData.questao
                                    })
                                    .then(() => {
                                        setStateAlternativaCerta('');

                                        formRef.current?.reset();

                                        Alert.alert('Questão inserida!', '', [
                                            {
                                                text: 'Fechar',
                                                onPress: (): void => navigation.dispatch(CommonActions.navigate({ name: 'Questões Listar' }))
                                            }
                                        ]);
                                    });
                            } catch (err: any) {
                                console.error(err);
                            } finally {
                                setStateLoader(false);
                            }
                        };

                        questaoInserir().catch((err: any) => console.error(err));
                    }
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

                    {stateSelectedItem ? (
                        <View style={styles.form}>
                            <Spacer height={10} />

                            <Form initialData={initialData} onSubmit={handleSubmit} ref={formRef}>
                                <View>
                                    <View>
                                        <InputDefault maxLength={1000} multiline={true} name="questao" placeholder="Questão" />
                                    </View>
                                </View>

                                <View style={styles.alternativa}>
                                    <View style={styles.alternativaCheckboxTitulo}>
                                        <Span>Certa</Span>
                                    </View>

                                    <View style={styles.alternativaCampo}>
                                        <Span>Alternativas</Span>
                                    </View>
                                </View>

                                <Spacer />

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
                                        title="Inserir"
                                        type="solid"
                                    />
                                </View>
                            </Form>

                            <Spacer height={10} />
                        </View>
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
}

export default QuestaoCriar;
