import React, { ReactElement } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import { DrawerNavigatorAdmin } from './drawerNavigatorAdmin';
import { DrawerNavigatorUser } from './drawerNavigatorUser';

const Stack = createStackNavigator();

export function StackNavigator(): ReactElement {
    // CONTEXT
    const { stateAuth } = useAuth();

    // STATE
    const { data } = stateAuth;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="User">
            {data?.admin ? (
                <Stack.Screen component={DrawerNavigatorAdmin} name="Admin" />
            ) : (
                <Stack.Screen component={DrawerNavigatorUser} name="User" />
            )}
        </Stack.Navigator>
    );
}
