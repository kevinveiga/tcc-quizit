import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { api } from '../../services/api';
import { sleep } from '../../helpers/sleep';

import { variable } from '../../styles/variable';

interface IUseAxiosInterceptor {
    stateLoader: boolean;
    setStateLoader: Dispatch<SetStateAction<boolean>>;
}

export function useAxiosInterceptor(): IUseAxiosInterceptor {
    const [stateLoader, setStateLoader] = useState<boolean>(false);

    // Mostrar loader no request, ocultar loader no response
    const interceptors = useMemo(
        () => ({
            request: (config: AxiosRequestConfig): AxiosRequestConfig => {
                setStateLoader(true);

                return config;
            },
            response: (response: AxiosResponse): AxiosResponse => {
                const delay = async (): Promise<void> => {
                    await sleep(parseInt(variable.timeout1s, 10) / 2);

                    setStateLoader(false);
                };

                delay()?.catch();

                return response;
            },
            error: (error: any): Promise<any> => {
                setStateLoader(false);

                return Promise.reject(error);
            }
        }),
        []
    );

    // INTERCEPTOR
    useEffect(() => {
        const interceptorRequest = api.interceptors.request.use(interceptors.request, interceptors.error);
        const interceptorResponse = api.interceptors.response.use(interceptors.response, interceptors.error);

        return (): void => {
            api.interceptors.request.eject(interceptorRequest);
            api.interceptors.response.eject(interceptorResponse);
        };
    }, [interceptors]);

    return { stateLoader, setStateLoader };
}
