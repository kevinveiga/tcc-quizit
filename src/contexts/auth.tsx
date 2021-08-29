import React, { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useEffect, useReducer } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { responseError } from '../helpers/responseError';
import { api } from '../services/api';
import { login, ILogin } from '../services/auth';
import { ActionType } from '../stores/action/actionType';
import { IAuth, authReducer, initialState } from '../stores/reducer/auth';

interface IActions {
    login(obj: ILogin): Promise<void>;
    logout(): Promise<void>;
}

interface IAuthContext {
    stateAuth: IAuth;
    actions?: IActions | null;
}

const AuthContext = createContext<IAuthContext>({
    stateAuth: initialState,
    actions: null
});

export function AuthProvider({ children }: PropsWithChildren<any>): ReactElement {
    // REDUCER
    const [stateAuth, dispatch] = useReducer(authReducer, initialState);

    // STATE
    // const [stateInitializing, setStateInitializing] = useState(true);

    const onAuthStateChanged = useCallback((user: any): void => {
        dispatch({ payload: user, type: user ? ActionType.LOGGED_IN : ActionType.LOGGED_OUT });

        // if (stateInitializing) {
        //     setStateInitializing(false);
        // }
    }, []);

    // Inicia o GoogleSignin
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        GoogleSignin.configure({
            webClientId: '831888473895-0s1jbjqakmh0n3f1531ra32e1qt2nrd8.apps.googleusercontent.com'
        });

        return subscriber;
    }, [onAuthStateChanged]);

    // ACTION
    const actions = {
        login: async (obj: ILogin): Promise<void> => {
            try {
                dispatch({
                    type: ActionType.ATTEMPTING
                });

                const response = await login(obj);

                if (response.status === 200 && response.data?.token) {
                    api.defaults.headers.Authorization = `Bearer ${response.data?.token as string}`;

                    dispatch({
                        payload: response.data,
                        type: ActionType.LOGGED_IN
                    });
                } else {
                    dispatch({
                        error: response.data?.message,
                        type: ActionType.FAILED
                    });
                }
            } catch (err) {
                dispatch({
                    error: responseError(err?.response?.data?.errors),
                    type: ActionType.FAILED
                });
            }
        },
        logout: async (): Promise<void> => {
            try {
                await auth().signOut();
            } catch (err) {
                dispatch({
                    error: `Falha ao fazer o logout: ${err as string}`,
                    type: ActionType.FAILED
                });
            }
        }
    };

    // Se está inicializando o app, então retorna vazio
    // if (stateInitializing) {
    //     return <></>;
    // }

    return <AuthContext.Provider value={{ stateAuth: stateAuth, actions: actions }}>{children}</AuthContext.Provider>;
}

export function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth can only be used inside AuthProvider');
    }

    return context;
}
