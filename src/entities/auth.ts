import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IAuthData extends FirebaseAuthTypes.User {
    nome?: string;
    success?: boolean;
    token?: string;
}
