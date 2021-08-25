import { Alert } from 'react-native';

interface IAlertCancelOk {
    callback?: any;
    message?: string;
    title: string;
}

export const alertCancelOk = ({ callback, message, title }: IAlertCancelOk): void => {
    Alert.alert(title, message, [
        {
            text: 'Cancelar',
            onPress: (): void => undefined,
            style: 'cancel'
        },
        { text: 'OK', onPress: (): void => callback?.() }
    ]);
};
