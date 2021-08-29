import { ActionType } from '../action/actionType';
import { IAuthData } from '../../entities/auth';

interface IAuthAction {
    error?: string | null;
    payload?: IAuthData | null;
    type: ActionType;
}

export interface IAuth {
    data?: IAuthData | null;
    error?: string | null;
    status?: ActionType;
}

export const initialState: IAuth = {
    data: undefined,
    error: '',
    status: ActionType.INITIATED
};

export function authReducer(state: IAuth, action: IAuthAction): IAuth {
    switch (action.type) {
        case ActionType.ATTEMPTING:
            return {
                ...state,
                error: '',
                status: ActionType.ATTEMPTING
            };
        case ActionType.FAILED:
            return {
                ...state,
                error: action.error,
                status: ActionType.FAILED
            };
        case ActionType.INITIATED:
            return {
                ...state,
                error: '',
                status: ActionType.INITIATED
            };
        case ActionType.LOGGED_IN:
            return {
                ...state,
                data: action.payload,
                error: '',
                status: ActionType.LOGGED_IN
            };
        case ActionType.LOGGED_OUT:
            return {
                ...state,
                data: null,
                error: '',
                status: ActionType.LOGGED_OUT
            };
        default:
            return state;
    }
}
