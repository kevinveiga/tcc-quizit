import React, { ReactElement, useEffect, useRef } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';
import Yup from '../../helpers/yup';

import { useAuth } from '../../contexts/auth';
import { IRouteParams } from '../../entities/routeParams';
import { ActionType } from '../../stores/action/actionType';

import { InputEmail, InputPassword } from '../../components/form/form';
import { Spacer } from '../../components/layout/spacer';
import { Title1 } from '../../components/text/text';

import { button } from '../../styles/button';
import { inputSecondary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgKey from '../../assets/svg/svg-key.svg';
import SvgUser from '../../assets/svg/svg-user.svg';

interface IFormLogin {
    email: string;
    password: string;
}

function Login(): ReactElement {
    // VARIABLE
    const initialData: IFormLogin = {
        email: '',
        password: ''
    };

    // CONTEXT
    const { stateAuth, actions } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();

    // STATE
    const { error, status } = stateAuth;
    const { routeParams, routeToRedirect } = (route.params as IRouteParams) || {};

    useEffect(() => {
        if (error) {
            Alert.alert('Erro:', error, [{ text: 'Fechar' }]);
        }

        return undefined;
    }, [error]);

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
                password: Yup.string().min(6).required()
            });

            await schema
                .validate(data, {
                    abortEarly: false
                })
                .then(() => {
                    actions?.login(data);
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
                <Spacer height={25} />

                <Title1 textAlign="center">QUIZ IT</Title1>

                <Spacer height={25} />

                <View>
                    <Form initialData={initialData} onSubmit={handleSubmit} ref={formRef}>
                        <View>
                            <View>
                                <InputEmail leftIcon={<SvgUser height="25px" width="25px" fill={variable.colorPrimary} />} theme={inputSecondary} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <InputPassword leftIcon={<SvgKey height="25px" width="25px" fill={variable.colorPrimary} />} theme={inputSecondary} />
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

                {Platform.OS === 'android' ? (
                    <View>
                        <Button
                            buttonStyle={button.buttonPrimary}
                            disabled={status === ActionType.ATTEMPTING}
                            onPress={(): any => formRef.current?.submitForm()}
                            title="Login Google"
                            type="solid"
                        />

                        <Spacer height={25} />

                        <Button
                            buttonStyle={button.buttonPrimary}
                            disabled={status === ActionType.ATTEMPTING}
                            onPress={(): any => formRef.current?.submitForm()}
                            title="Login Facebook"
                            type="solid"
                        />
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}

export default Login;
