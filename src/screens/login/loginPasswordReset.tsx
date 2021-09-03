import React, { ReactElement, useRef } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';

import { useAuth } from '../../contexts/auth';
import Yup from '../../helpers/yup';
import { ILoginPasswordReset } from '../../interface';
import { ActionType } from '../../stores/action/actionType';

import { InputEmail } from '../../components/form/form';
import { Spacer } from '../../components/layout/spacer';
import { Title1, Title2 } from '../../components/text/text';

import { button } from '../../styles/button';
import { inputSecondary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import SvgUser from '../../assets/svg/svg-user.svg';

function LoginPasswordReset(): ReactElement {
    // VARIABLE
    const initialData: ILoginPasswordReset = {
        email: ''
    };

    // STYLE
    const styles = StyleSheet.create({
        loginPasswordReset: {
            minHeight: Dimensions.get('window').height - 100,
            justifyContent: 'center'
        }
    });

    // CONTEXT
    const { stateAuth, actions } = useAuth();

    // STATE
    const { status } = stateAuth;

    // FORM
    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<ILoginPasswordReset> = async (data) => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required()
            });

            await schema
                .validate(data, {
                    abortEarly: false
                })
                .then(() => {
                    actions
                        ?.loginPasswordReset(data.email)
                        .then(() => Alert.alert('Alteração de senha:', 'Foi enviado um e-mail para você alterar sua senha', [{ text: 'Fechar' }]))
                        .catch((loginPasswordResetError) => Alert.alert('Erro:', loginPasswordResetError.toString(), [{ text: 'Fechar' }]));
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
                <View style={styles.loginPasswordReset}>
                    <Spacer height={25} />

                    <Title1 textAlign="center">QUIZ IT</Title1>

                    <Spacer height={25} />

                    <Title2 textAlign="center">Alterar senha</Title2>

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
                                <Button
                                    buttonStyle={button.buttonPrimary}
                                    disabled={status === ActionType.ATTEMPTING}
                                    onPress={(): any => formRef.current?.submitForm()}
                                    title="Enviar"
                                    type="solid"
                                />
                            </View>
                        </Form>
                    </View>

                    <Spacer height={25} />
                </View>
            </ScrollView>
        </View>
    );
}

export default LoginPasswordReset;
