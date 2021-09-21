import { useCallback, useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';

interface IUseVerifyAdminRole {
    stateAdminRole: boolean;
    stateInitializing: boolean;
}

export const useVerifyAdminRole = (): IUseVerifyAdminRole => {
    // STATE
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

    return { stateAdminRole, stateInitializing };
};
