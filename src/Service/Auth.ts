import { AxiosResponse } from 'axios';

import { api } from './Api';
import { apiUrlLogin } from '../Config';

export interface ILogin {
    email: string;
    password: string;
}

export const login = async (data: ILogin): Promise<AxiosResponse> => {
    const response = await api.post(apiUrlLogin, data, {});

    return response;
};
