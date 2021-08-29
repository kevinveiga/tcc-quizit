import React, { ReactElement, useEffect, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Button } from 'react-native-elements';
import Yup from '../../helpers/yup';

import { useAuth } from '../../contexts/auth';
import { IRouteParams } from '../../entities/routeParams';
import { ActionType } from '../../stores/action/actionType';

import { InputEmail, InputPassword } from '../../components/form/form';
import { ImageBg } from '../../components/image/imageBg';
import { Spacer } from '../../components/layout/spacer';
import { Title4 } from '../../components/text/title';

import { button } from '../../styles/button';
import { inputSecondary } from '../../styles/form';
import { layout } from '../../styles/layout';
import { variable } from '../../styles/variable';

import ImageHomeTop from '../../Asset/Image/home-top.png';
import SvgKey from '../../Asset/Svg/svg-key.svg';
import SvgUser from '../../Asset/Svg/svg-user.svg';

interface IFormLogin {
    email: string;
    password: string;
}

export default function Home(): ReactElement {
    // VARIABLE
    const initialData: IFormLogin = {
        email: '',
        password: ''
    };

    // STYLE
    const styles = StyleSheet.create({
        homeTop: {
            width: '100%'
        },
        login: {
            width: '100%'
        }
    });

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

        if (status === ActionType.LOGGED_IN) {
            if (routeToRedirect) {
                navigation.navigate(routeToRedirect, routeParams);
            } else {
                navigation.navigate('Home');
            }
        }

        return undefined;
    }, [error, navigation, routeParams, routeToRedirect, status]);

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
        <ImageBg source={ImageHomeTop}>
            <View style={{ ...layout.container, ...styles.homeTop }}>
                <ScrollView>
                    <Spacer height={25} />

                    <Title4 color={variable.colorWhite} textAlign="center">
                        QUIZ IT
                    </Title4>

                    <Spacer />

                    <View style={styles.login}>
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
                </ScrollView>
            </View>
        </ImageBg>
    );
}
