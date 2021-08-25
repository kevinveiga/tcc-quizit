import React, { createContext, PropsWithChildren, ReactElement, useContext, useEffect, useReducer } from 'react';

import { storageAuthName } from '../Config';
import { responseError } from '../Helper/ResponseError';
import { api } from '../Service/Api';
import { login, ILogin } from '../Service/Auth';
import { clearStorage, getStorageJson, setStorage } from '../Service/Storage';
import { ActionType } from '../Store/Action/ActionType';
import { IAuth, authReducer, initialState } from '../Store/Reducer/Auth';

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

    // Ao iniciar o App, verifica se já existe um storage de autenticação,
    // então pega o "data" desse storage e faz um dispatch alterando "stateAuth"
    useEffect(() => {
        getStorageJson(storageAuthName)
            .then((res) => {
                if (res?.data) {
                    dispatch({ payload: res?.data, type: ActionType.LOGGED_IN });
                }
            })
            .catch(() => console.log('Sem storage de autenticação'));

        return undefined;
    }, []);

    // Ao alterar o state de autenticação, atualiza o storage
    useEffect(() => {
        const { data: dataAuth } = stateAuth;

        // Se o data for diferente de "undefined", grava os dados de autenticação do usuário no storage,
        // então muda o "headers" de autorização
        if (dataAuth !== undefined) {
            setStorage(storageAuthName, stateAuth)
                .then(() => {
                    api.defaults.headers.Authorization = `Bearer ${dataAuth?.token as string}`;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }

        return undefined;
    }, [stateAuth]);

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
            await clearStorage()
                .then(() => {
                    dispatch({
                        type: ActionType.LOGGED_OUT
                    });
                })
                .catch(() => {
                    dispatch({
                        error: 'Falha ao fazer o logout',
                        type: ActionType.FAILED
                    });
                });
        }
    };

    return <AuthContext.Provider value={{ stateAuth: stateAuth, actions: actions }}>{children}</AuthContext.Provider>;
}

export function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth can only be used inside AuthProvider');
    }

    return context;
}
