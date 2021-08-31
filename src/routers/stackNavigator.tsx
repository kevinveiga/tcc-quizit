import React, { ReactElement } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { DrawerNavigator } from './drawerNavigator';

const Stack = createStackNavigator();

export function StackNavigator(): ReactElement {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
            <Stack.Screen component={DrawerNavigator} name="Root" />
        </Stack.Navigator>
    );
}
