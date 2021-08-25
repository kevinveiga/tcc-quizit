import 'react-native-gesture-handler';

import React, { ReactElement } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from './Context/App';
import { AuthProvider } from './Context/Auth';
import { navigationRef } from './Router/RootNavigation';
import StackNavigator from './Router/StackNavigator';

import { layout } from './Style/Layout';
import { theme } from './Style/Theme';

export function App(): ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider style={layout.safeArea}>
                <AppProvider>
                    <AuthProvider>
                        <NavigationContainer ref={navigationRef}>
                            <StackNavigator />
                        </NavigationContainer>
                    </AuthProvider>
                </AppProvider>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
