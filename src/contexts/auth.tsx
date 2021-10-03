import React, { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useApp } from './app';
import { ILogin } from '../services/auth';
import { ActionType } from '../stores/action/actionType';
import { IAuth, authReducer, initialState } from '../stores/reducer/auth';

interface IActions {
    login(obj: ILogin): Promise<void>;
    loginCreate(obj: ILogin): Promise<void>;
    loginFacebook(): Promise<void>;
    loginGoogle(): Promise<void>;
    loginPasswordReset(email: string): Promise<void>;
    logout(): Promise<void>;
}

interface IAuthContext {
    stateAdminRole: boolean;
    stateAuth: IAuth;
    actions?: IActions | null;
}

const AuthContext = createContext<IAuthContext>({
    stateAdminRole: false,
    stateAuth: initialState,
    actions: null
});

export function AuthProvider({ children }: PropsWithChildren<any>): ReactElement {
    // CONTEXT
    const { setStateLoader } = useApp();

    // REDUCER
    const [stateAuth, dispatch] = useReducer(authReducer, initialState);
    const { status } = stateAuth;

    // STATE
    const [stateAdminRole, setStateAdminRole] = useState(false);
    const [stateInitializing, setStateInitializing] = useState(true);

    // FUNCTION
    const authStateChanged = useCallback(
        (user: FirebaseAuthTypes.User | null): void => {
            auth()
                .currentUser?.getIdTokenResult()
                .then((idTokenResult) => {
                    setStateAdminRole(idTokenResult.claims.admin);
                })
                .catch((err: any) => {
                    throw new Error(err.code);
                });

            dispatch({ payload: user, type: user?.uid ? ActionType.LOGGED_IN : ActionType.LOGGED_OUT });

            if (stateInitializing) {
                setStateInitializing(false);
            }
        },
        [stateInitializing]
    );

    // USEEFFECT
    // Loader no login
    useEffect(() => {
        if (status === ActionType.ATTEMPTING) {
            setStateLoader(true);
        }

        return (): void => {
            setStateLoader(false);
        };
    }, [status, setStateLoader]);

    // Inicia o GoogleSignin
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '831888473895-0s1jbjqakmh0n3f1531ra32e1qt2nrd8.apps.googleusercontent.com'
        });
    }, []);

    // Quando o estado do usuário é alterado
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(authStateChanged);

        return subscriber;
    }, [authStateChanged]);

    // ACTION
    const actions = {
        login: async (obj: ILogin): Promise<void> => {
            try {
                dispatch({
                    type: ActionType.ATTEMPTING
                });

                await auth().signInWithEmailAndPassword(obj.email, obj.password);
            } catch (err: any) {
                dispatch({
                    error: err.code.toString(),
                    type: ActionType.FAILED
                });

                throw new Error(err.code);
            }
        },
        loginCreate: async (obj: ILogin): Promise<void> => {
            try {
                dispatch({
                    type: ActionType.ATTEMPTING
                });

                await auth().createUserWithEmailAndPassword(obj.email, obj.password);
            } catch (err: any) {
                dispatch({
                    error: err.code.toString(),
                    type: ActionType.FAILED
                });

                throw new Error(err.code);
            }
        },
        loginFacebook: async (): Promise<void> => {
            try {
                dispatch({
                    type: ActionType.ATTEMPTING
                });

                // Attempt login with permissions
                const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                if (result.isCancelled) {
                    throw 'User cancelled the login process';
                }

                // Once signed in, get the users AccesToken
                const data = await AccessToken.getCurrentAccessToken();

                if (!data) {
                    throw 'Something went wrong obtaining access token';
                }

                // Create a Firebase credential with the AccessToken
                const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                // Sign-in the user with the credential
                await auth().signInWithCredential(facebookCredential);
            } catch (err: any) {
                dispatch({
                    error: err.code.toString(),
                    type: ActionType.FAILED
                });

                throw new Error(err.code);
            }
        },
        loginGoogle: async (): Promise<void> => {
            try {
                dispatch({
                    type: ActionType.ATTEMPTING
                });

                // Get the users ID token
                const { idToken } = await GoogleSignin.signIn();

                // Create a Google credential with the token
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                // Sign-in the user with the credential
                await auth().signInWithCredential(googleCredential);
            } catch (err: any) {
                dispatch({
                    error: err.code.toString(),
                    type: ActionType.FAILED
                });

                throw new Error(err.code);
            }
        },
        loginPasswordReset: async (email: string): Promise<void> => {
            try {
                await auth().sendPasswordResetEmail(email);
            } catch (err: any) {
                dispatch({
                    error: err.code.toString(),
                    type: ActionType.FAILED
                });

                throw new Error(err.code);
            }
        },
        logout: async (): Promise<void> => {
            try {
                await auth().signOut();
            } catch (err: any) {
                dispatch({
                    error: `Falha ao fazer o logout: ${err.code as string}`,
                    type: ActionType.FAILED
                });

                throw new Error(err.code);
            }
        }
    };

    // Se está inicializando o app, então retorna vazio
    if (stateInitializing) {
        return <></>;
    }

    return <AuthContext.Provider value={{ stateAdminRole: stateAdminRole, stateAuth: stateAuth, actions: actions }}>{children}</AuthContext.Provider>;
}

export function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth can only be used inside AuthProvider');
    }

    return context;
}
