import { useEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import { ActionType } from '../action/actionType';

export const useVerifyAuthentication = (): void => {
    // CONTEXT
    const { stateAuth } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();

    // STATE
    const { status } = stateAuth;

    useEffect(() => {
        // Se não estiver logado, redireciona para Home, passando os parâmetros
        if (status !== ActionType.LOGGED_IN) {
            navigation.navigate('Home', { routeParams: route.params, routeToRedirect: route.name });
        }

        return undefined;
    }, [navigation, route, status]);
};