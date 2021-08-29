import React, { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

import { Text } from 'react-native-elements';

interface IProps {
    children: ReactNode;
}

interface IState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
    static getDerivedStateFromError(): IState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    constructor(props: PropsWithChildren<any>) {
        super(props);
        this.state = { hasError: false };
    }

    // You can also log the error to an error reporting service
    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('Error: ', error);
        console.info('Info: ', info);
    }

    render(): ReactNode {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // You can render any custom fallback UI
            return <Text>Erro de conexão.</Text>;
        }

        return children;
    }
}
