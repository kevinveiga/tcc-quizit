import React, { ReactElement, useEffect, useRef } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';

import { useAuth } from '../../contexts/auth';
import { IRouteParams } from '../../entities/routeParams';
import Yup from '../../helpers/yup';
import { IFormLogin } from '../../interface';
import { ActionType } from '../../stores/action/actionType';

import { InputEmail, InputPassword, InputPasswordConfirm } from '../../components/form/form';
import { Spacer } from '../../components/layout/spacer';
import { P, Title1, Title2 } from '../../components/text/text';

import { button } from '../../styles/button';
import { inputSecondary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgKey from '../../assets/svg/svg-key.svg';
import SvgUser from '../../assets/svg/svg-user.svg';

function LoginCreate(): ReactElement {
    // VARIABLE
    const initialData: IFormLogin = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    // STYLE
    const styles = StyleSheet.create({
        loginCreate: {
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
    const { routeParams, routeToRedirect } = (route.params as IRouteParams) || {};

    useEffect(() => {
        if (status === ActionType.LOGGED_IN) {
            if (routeToRedirect) {
                navigation.dispatch(CommonActions.navigate({ name: routeToRedirect, params: routeParams }));
            } else {
                navigation.dispatch(CommonActions.navigate({ name: 'Admin' }));
            }
        }

        return undefined;
    }, [navigation, routeParams, routeToRedirect, status]);

    // FORM
    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<IFormLogin> = async (data) => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
                passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmar senha não está igual')
            });

            await schema
                .validate(data, {
                    abortEarly: false
                })
                .then(() => {
                    actions?.loginCreate(data).catch((loginCreateError) => Alert.alert('Erro:', loginCreateError.toString(), [{ text: 'Fechar' }]));
                });

            formRef.current?.setErrors({});
        } catch (err) {
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
                <View style={styles.loginCreate}>
                    <Spacer height={25} />

                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer height={25} />

                    <Title2 textAlign="center">Criar login</Title2>

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
                                <View>
                                    <InputPasswordConfirm
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
                                    title="Criar login"
                                    type="solid"
                                />
                            </View>
                        </Form>
                    </View>

                    <Spacer height={25} />

                    <TouchableOpacity onPress={(): any => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                        <P fontSize={20} textAlign="center">
                            Tem uma conta? Clique aqui
                        </P>
                    </TouchableOpacity>

                    <Spacer height={25} />
                </View>
            </ScrollView>
        </View>
    );
}

export default LoginCreate;
