import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationOptions } from '@react-navigation/drawer';
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';

import { displayName } from '../../app.json';
import { useAuth } from '../contexts/auth';
import { IRoutes } from '../interface';
import { routes } from './routes';
import { ActionType } from '../stores/action/actionType';

import { ErrorBoundary } from '../components/errorBoundary/errorBoundary';
import { Span, Title3 } from '../components/text/text';

import { header } from '../styles/header';
import { variable } from '../styles/variable';

import SvgClose from '../assets/svg/svg-close.svg';
import SvgMenu from '../assets/svg/svg-menu.svg';
import SvgUser from '../assets/svg/svg-user.svg';

const Drawer = createDrawerNavigator();

function MenuDrawerContent({ descriptors, state, props }: any): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        btnClose: {
            backgroundColor: variable.colorWhite,
            borderRadius: variable.borderRadius,
            padding: 5,
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 3
        }
    });

    // CONTEXT
    const { actions, stateAuth } = useAuth();
    const navigation = useNavigation();

    // STATE
    const { status } = stateAuth;
    const [stateAdminRole, setStateAdminRole] = useState(false);
    const [stateInitializing, setStateInitializing] = useState(true);

    const onAuthStateChanged = useCallback((): void => {
        auth()
            .currentUser?.getIdTokenResult()
            .then((idTokenResult) => {
                setStateAdminRole(idTokenResult.claims.admin);
            })
            .catch((err: any) => {
                throw new Error(err.code);
            });

        if (stateInitializing) {
            setStateInitializing(false);
        }
    }, [stateInitializing]);

    // Quando o estado do usuário é alterado
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber;
    }, [onAuthStateChanged]);

    // Se está inicializando o app, então retorna vazio
    if (stateInitializing) {
        return <></>;
    }

    return (
        <>
            <DrawerContentScrollView {...props}>
                {routes
                    .sort((a, b) => {
                        return (a.order || 0) - (b.order || 0);
                    })
                    .map(({ adminRole = false, authRequired = true, routeLabel, showInMenu = true }: IRoutes) => {
                        const { key } = state.routes[state.routes.findIndex((item: any) => item.name === routeLabel)];
                        const { activeTintColor, drawerLabel, inactiveTintColor } = descriptors[key].options;

                        /*
                        - Se o item precisa de autenticação e que seja do papel de Admin, verifica se está logado e se tem o papel de Admin, então mostra.
                        - Se o item precisa de autenticação e não precisa que seja do papel de Admin, verifica se está logado, então mostra.
                        - Se o item não precisa de autenticação, então mostra.
                        - Se o item precisa de autenticação e não está logado, então não mostra (null)
                        */
                        const showDrawerItem =
                            status === ActionType.LOGGED_IN && adminRole && stateAdminRole
                                ? true
                                : status === ActionType.LOGGED_IN && !adminRole && !stateAdminRole && authRequired
                                ? true
                                : !authRequired
                                ? true
                                : false;

                        if (showDrawerItem && showInMenu) {
                            return (
                                <DrawerItem
                                    activeTintColor={activeTintColor || variable.colorPrimary}
                                    focused={state.routes.findIndex((e: any) => e.name === routeLabel) === state.index}
                                    inactiveTintColor={inactiveTintColor || variable.fontColor}
                                    key={key}
                                    label={({ color }): ReactElement => <Span color={color}>{drawerLabel}</Span>}
                                    onPress={(): void => navigation.dispatch(CommonActions.navigate({ name: routeLabel }))}
                                />
                            );
                        }

                        if (showDrawerItem && showInMenu) {
                            return (
                                <DrawerItem
                                    activeTintColor={activeTintColor || variable.colorPrimary}
                                    focused={state.routes.findIndex((e: any) => e.name === routeLabel) === state.index}
                                    inactiveTintColor={inactiveTintColor || variable.fontColor}
                                    key={key}
                                    label={({ color }): ReactElement => <Span color={color}>{drawerLabel}</Span>}
                                    onPress={(): void => navigation.dispatch(CommonActions.navigate({ name: routeLabel }))}
                                />
                            );
                        }
                    })}

                {status === ActionType.LOGGED_IN && (
                    <DrawerItem
                        label={(): ReactElement => <Span>Logout</Span>}
                        onPress={(): any => {
                            actions
                                ?.logout()
                                .then(() => {
                                    navigation.dispatch(CommonActions.navigate({ name: 'Login' }));
                                })
                                .catch((logoutError) => Alert.alert('Erro:', logoutError.toString(), [{ text: 'Fechar' }]));
                        }}
                    />
                )}
            </DrawerContentScrollView>

            <View style={styles.btnClose}>
                <TouchableOpacity onPress={(): any => navigation.dispatch(DrawerActions.closeDrawer())}>
                    <SvgClose height="18px" width="18px" fill={variable.colorSecondary} />
                </TouchableOpacity>
            </View>
        </>
    );
}

export function DrawerNavigator(): ReactElement {
    // STYLE
    const styles = StyleSheet.create({
        drawerNavigatorLeft: {
            paddingLeft: variable.padding
        },
        drawerNavigatorRight: {
            paddingRight: variable.padding
        }
    });

    // CONTEXT
    const { actions, stateAuth } = useAuth();
    const navigation = useNavigation();

    // STATE
    const { status } = stateAuth;
    const [stateAdminRole, setStateAdminRole] = useState(false);
    const [stateInitializing, setStateInitializing] = useState(true);

    const onAuthStateChanged = useCallback((): void => {
        auth()
            .currentUser?.getIdTokenResult()
            .then((idTokenResult) => {
                setStateAdminRole(idTokenResult.claims.admin);
            })
            .catch((err: any) => {
                throw new Error(err.code);
            });

        if (stateInitializing) {
            setStateInitializing(false);
        }
    }, [stateInitializing]);

    // Quando o estado do usuário é alterado
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber;
    }, [onAuthStateChanged]);

    // Se está inicializando o app, então retorna vazio
    if (stateInitializing) {
        return <></>;
    }

    return (
        <Drawer.Navigator
            drawerContent={(props): ReactElement => <MenuDrawerContent {...props} />}
            initialRouteName={'Login'}
            screenOptions={{ ...header, headerTitleAlign: 'center' }}
        >
            {routes.map(
                ({ adminRole = false, authRequired = true, component: Component, layout: Layout, routeLabel, showHeader = true }: IRoutes) => {
                    /*
                    - Se o componente precisa de autenticação e que seja do papel de Admin, verifica se está logado e se tem o papel de Admin, então mostra.
                    - Se o componente precisa de autenticação e não precisa que seja do papel de Admin, verifica se está logado, então mostra.
                    - Se o componente não precisa de autenticação, então mostra.
                    - Se o componente precisa de autenticação e não está logado, então não mostra (null)
                    */
                    const showComponent =
                        status === ActionType.LOGGED_IN && adminRole && stateAdminRole
                            ? true
                            : status === ActionType.LOGGED_IN && !adminRole && !stateAdminRole && authRequired
                            ? true
                            : !authRequired
                            ? true
                            : false;

                    return (
                        <Drawer.Screen
                            key={routeLabel}
                            name={routeLabel}
                            options={(): DrawerNavigationOptions => ({
                                drawerLabel: routeLabel,
                                headerTitle: (): ReactElement => {
                                    return (
                                        <View>
                                            <Title3>{displayName}</Title3>
                                        </View>
                                    );
                                },
                                headerLeft: (): ReactElement => {
                                    return (
                                        <TouchableOpacity
                                            onPress={(): any => navigation.dispatch(DrawerActions.toggleDrawer())}
                                            style={styles.drawerNavigatorLeft}
                                        >
                                            <SvgMenu height="25px" width="25px" fill={variable.colorPrimary} />
                                        </TouchableOpacity>
                                    );
                                },
                                headerRight: (): ReactElement => {
                                    return (
                                        <TouchableOpacity
                                            onPress={(): any =>
                                                actions
                                                    ?.logout()
                                                    .then(() => {
                                                        navigation.dispatch(CommonActions.navigate({ name: 'Login' }));
                                                    })
                                                    .catch((logoutError) => Alert.alert('Erro:', logoutError.toString(), [{ text: 'Fechar' }]))
                                            }
                                            style={styles.drawerNavigatorRight}
                                        >
                                            <SvgUser height="25px" width="25px" fill={variable.colorPrimary} />
                                        </TouchableOpacity>
                                    );
                                },
                                headerShown: showHeader
                            })}
                        >
                            {(): ReactElement => (
                                <Layout>
                                    <ErrorBoundary>{showComponent ? <Component /> : null}</ErrorBoundary>
                                </Layout>
                            )}
                        </Drawer.Screen>
                    );
                }
            )}
        </Drawer.Navigator>
    );
}
