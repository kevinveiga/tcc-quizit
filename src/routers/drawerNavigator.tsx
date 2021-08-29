import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationOptions } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';
import { routes, IRoutes } from './routes';
import { ActionType } from '../stores/action/actionType';

import { ErrorBoundary } from '../components/errorBoundary/errorBoundary';
import { Span } from '../components/text/span';

import { header } from '../styles/header';
import { variable } from '../styles/variable';

import SvgClose from '../assets/svg/svg-close.svg';
import SvgLogo from '../assets/svg/svg-logo.svg';
import SvgMenu from '../assets/svg/svg-menu.svg';
import SvgMessage from '../assets/svg/svg-message.svg';

const Drawer = createDrawerNavigator();

function MenuDrawerContent({ descriptors, navigation, state, props }: any): ReactElement {
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

    // STATE
    const { status } = stateAuth;

    return (
        <>
            <DrawerContentScrollView {...props}>
                {routes
                    .sort((a, b) => {
                        return (a.order || 0) - (b.order || 0);
                    })
                    .map(({ authRequired = true, routeLabel, showInMenu = true }: IRoutes) => {
                        const { key } = state.routes[state.routes.findIndex((item: any) => item.name === routeLabel)];
                        const { activeTintColor, drawerLabel, inactiveTintColor } = descriptors[key].options;

                        if (!authRequired && showInMenu) {
                            return (
                                <DrawerItem
                                    activeTintColor={activeTintColor || variable.colorPrimary}
                                    focused={state.routes.findIndex((e: any) => e.name === routeLabel) === state.index}
                                    inactiveTintColor={inactiveTintColor || variable.colorSecondary}
                                    key={key}
                                    label={({ color }): ReactElement => <Span color={color}>{drawerLabel}</Span>}
                                    onPress={(): void => navigation.navigate(routeLabel)}
                                />
                            );
                        }

                        if (status === ActionType.LOGGED_IN && authRequired && showInMenu) {
                            return (
                                <DrawerItem
                                    activeTintColor={activeTintColor || variable.colorPrimary}
                                    focused={state.routes.findIndex((e: any) => e.name === routeLabel) === state.index}
                                    inactiveTintColor={inactiveTintColor || variable.colorSecondary}
                                    key={key}
                                    label={({ color }): ReactElement => <Span color={color}>{drawerLabel}</Span>}
                                    onPress={(): void => navigation.navigate(routeLabel)}
                                />
                            );
                        }
                    })}

                {status === ActionType.LOGGED_IN && (
                    <DrawerItem
                        label="Logout"
                        onPress={(): any => {
                            actions?.logout()?.then(() => {
                                navigation.navigate('Home');
                            });
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

export default function DrawerNavigator(): ReactElement {
    // VARIABLE
    const messageNumberWrapSize = 15;

    // STYLE
    const styles = StyleSheet.create({
        logoWrapper: {
            alignItems: 'center',
            height: '100%',
            width: 150
        },
        messageNumberWarp: {
            alignItems: 'center',
            backgroundColor: variable.colorWhite,
            borderRadius: messageNumberWrapSize,
            height: messageNumberWrapSize,
            justifyContent: 'center',
            position: 'absolute',
            right: -2,
            top: -2,
            width: messageNumberWrapSize
        }
    });

    // CONTEXT
    const { stateAuth } = useAuth();

    // STATE
    const { status } = stateAuth;

    return (
        <Drawer.Navigator
            drawerContent={(props): ReactElement => <MenuDrawerContent {...props} />}
            initialRouteName={status === ActionType.LOGGED_IN ? 'Admin' : 'Home'}
            screenOptions={{ ...header, headerTitleAlign: 'center' }}
        >
            {routes.map(({ authRequired = true, component: Component, layout: Layout, routeLabel }: IRoutes) => {
                return (
                    <Drawer.Screen
                        key={routeLabel}
                        name={routeLabel}
                        options={({ navigation }): DrawerNavigationOptions => ({
                            drawerLabel: routeLabel,
                            headerTitle: (): ReactElement => {
                                return (
                                    <View style={styles.logoWrapper}>
                                        <SvgLogo height="100%" width="100%" />
                                    </View>
                                );
                            },
                            headerLeft: (): ReactElement => {
                                return (
                                    <TouchableOpacity onPress={(): any => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                        <SvgMenu height="25px" width="25px" fill={variable.colorSecondary} />
                                    </TouchableOpacity>
                                );
                            },
                            headerRight: (): ReactElement => {
                                return (
                                    <TouchableOpacity onPress={(): any => navigation.navigate('Home')}>
                                        <SvgMessage height="25px" width="25px" fill={variable.colorSecondary} />
                                    </TouchableOpacity>
                                );
                            },
                            headerShown: true
                        })}
                    >
                        {(): ReactElement => (
                            <Layout>
                                <ErrorBoundary>
                                    {/*
                                    - Se o componente precisa de autenticação, verifica se está logado e exibe o componente.
                                    - Se não estiver logado e o componente não precisa de autenticação, exibe o componente.
                                    - Se o componente precisa de autenticação e não está logado, então não exibe o componente (null)
                                    */}
                                    {authRequired && status === ActionType.LOGGED_IN ? <Component /> : !authRequired ? <Component /> : null}
                                </ErrorBoundary>
                            </Layout>
                        )}
                    </Drawer.Screen>
                );
            })}
        </Drawer.Navigator>
    );
}
