import React, { ReactElement } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './drawerNavigator';

const Stack = createStackNavigator();

export default function StackNavigator(): ReactElement {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Root">
            <Stack.Screen component={DrawerNavigator} name="Root" />
        </Stack.Navigator>
    );
}
