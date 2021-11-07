import React, { ReactElement, useRef } from 'react';
import { Alert, Dimensions, Platform, ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';

import { useAuth } from '../../contexts/auth';
import { IRouteParams } from '../../entities/routeParams';
import Yup from '../../helpers/yup';
import { IFormLogin } from '../../interface';
import { ActionType } from '../../stores/action/actionType';

import { InputEmail, InputPassword } from '../../components/form/form';
import { HorizontalLine } from '../../components/layout/line';
import { Spacer } from '../../components/layout/spacer';
import { P, Title1, Title2 } from '../../components/text/text';

import { button } from '../../styles/button';
import { inputSecondary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgKey from '../../assets/svg/svg-key.svg';
import SvgUser from '../../assets/svg/svg-user.svg';

function Login(): ReactElement {
    // VARIABLE
    const initialData: IFormLogin = {
        email: '',
        password: ''
    };

    // STYLE
    const styles = StyleSheet.create({
        buttonFacebook: {
            backgroundColor: variable.colorBlue
        },
        buttonGoogle: {
            backgroundColor: variable.colorRed
        },
        login: {
            minHeight: Dimensions.get('window').height - 100,
            justifyContent: 'center'
        }
    });

    // CONTEXT
    const { stateAuth, actions } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();

    // STATE
    const { status } = stateAuth;
    const { routeParams } = (route.params as IRouteParams) || {};

    // FUNCTION
    const redirect = (): void => {
        navigation.dispatch(
            CommonActions.navigate(
                routeParams?.routeToRedirect ? { name: routeParams?.routeToRedirect, params: routeParams } : { name: 'Categorias Questões' }
            )
        );
    };

    // FORM
    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<IFormLogin> = async (data) => {
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
                    actions
                        ?.login(data)
                        .then(() => redirect())
                        .catch((loginError) => Alert.alert('Erro:', loginError.toString(), [{ text: 'Fechar' }]));
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
        <View style={{ ...layout.container }}>
            <ScrollView>
                <View style={styles.login}>
                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer />

                    <Title2 textAlign="center">Login</Title2>

                    <Spacer height={25} />

                    <View>
                        <Form initialData={initialData} onSubmit={handleSubmit} ref={formRef}>
                            <View>
                                <View>
                                    <InputEmail
                                        leftIcon={<SvgUser height="25px" width="25px" fill={variable.colorPrimary} />}
                                        theme={inputSecondary}
                                    />
                                </View>
                            </View>

                            <View>
                                <View>
                                    <InputPassword
                                        leftIcon={<SvgKey height="25px" width="25px" fill={variable.colorPrimary} />}
                                        theme={inputSecondary}
                                    />
                                </View>
                            </View>

                            <View>
                                <Button
                                    buttonStyle={button.buttonPrimary}
                                    disabled={status === ActionType.ATTEMPTING}
                                    onPress={(): any => formRef.current?.submitForm()}
                                    title="Entrar"
                                    type="solid"
                                />
                            </View>
                        </Form>
                    </View>

                    <Spacer height={25} />

                    <TouchableOpacity onPress={(): any => navigation.dispatch(CommonActions.navigate({ name: 'Esqueci a senha' }))}>
                        <P textAlign="center">Esqueceu a senha? Clique aqui</P>
                    </TouchableOpacity>

                    <Spacer height={25} />

                    <HorizontalLine />

                    <Spacer height={25} />

                    {Platform.OS === 'android' ? (
                        <View>
                            <Button
                                buttonStyle={{ ...button.buttonPrimary, ...styles.buttonGoogle }}
                                disabled={status === ActionType.ATTEMPTING}
                                onPress={(): any =>
                                    actions
                                        ?.loginGoogle()
                                        .then(() => redirect())
                                        .catch((loginError) => Alert.alert('Erro:', loginError.toString(), [{ text: 'Fechar' }]))
                                }
                                title="Login Google"
                                type="solid"
                            />

                            <Spacer height={25} />

                            <Button
                                buttonStyle={{ ...button.buttonPrimary, ...styles.buttonFacebook }}
                                disabled={status === ActionType.ATTEMPTING}
                                onPress={(): any =>
                                    actions
                                        ?.loginFacebook()
                                        .then(() => redirect())
                                        .catch((loginError) => Alert.alert('Erro:', loginError.toString(), [{ text: 'Fechar' }]))
                                }
                                title="Login Facebook"
                                type="solid"
                            />
                        </View>
                    ) : null}

                    <Spacer height={25} />

                    <HorizontalLine />

                    <Spacer height={25} />

                    <TouchableOpacity onPress={(): any => navigation.dispatch(CommonActions.navigate({ name: 'Criar Login' }))}>
                        <P fontSize={20} textAlign="center">
                            Não tem conta? Crie uma aqui
                        </P>
                    </TouchableOpacity>

                    <Spacer height={25} />

                    <TouchableOpacity onPress={(): any => navigation.dispatch(CommonActions.navigate({ name: 'Login Admin' }))}>
                        <P textAlign="center">Login de Admin</P>
                    </TouchableOpacity>

                    <Spacer height={25} />
                </View>
            </ScrollView>
        </View>
    );
}

export default Login;
