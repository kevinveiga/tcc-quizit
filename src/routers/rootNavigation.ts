import { createRef } from 'react';

import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export const navigate = (name: string, params: Record<string, unknown>): void => {
    if (navigationRef.current?.getRootState() && navigationRef.current) {
        navigationRef.current?.navigate(name, params);
    }
};
