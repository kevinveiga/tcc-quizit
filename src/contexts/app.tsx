import React, { createContext, Dispatch, PropsWithChildren, ReactElement, SetStateAction, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAxiosInterceptor } from '../stores/axiosInterceptor/axiosInterceptor';

import { layout } from '../styles/layout';
import { variable } from '../styles/variable';

interface IAppContext {
    setStateLoader: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext>({
    setStateLoader: (): boolean => false
});

export function AppProvider({ children }: PropsWithChildren<any>): ReactElement {
    // Loader no AxiosInterceptor
    const { stateLoader, setStateLoader } = useAxiosInterceptor();

    return (
        <AppContext.Provider
            value={{
                setStateLoader: setStateLoader
            }}
        >
            {stateLoader && (
                <View style={layout.loaderWrap}>
                    <ActivityIndicator size="large" color={variable.colorWhite} />
                </View>
            )}

            {children}
        </AppContext.Provider>
    );
}

export function useApp(): IAppContext {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useApp can only be used inside AppProvider');
    }

    return context;
}
