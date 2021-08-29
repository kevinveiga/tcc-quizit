import React from 'react';
import { AppRegistry } from 'react-native';

import { appName } from './app.json';
import { App } from './src/app';

function HeadlessCheck({ isHeadless }) {
    // App has been launched in the background by iOS, ignore
    return isHeadless ? null : <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
