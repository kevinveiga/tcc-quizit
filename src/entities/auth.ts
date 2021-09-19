import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IAuthData extends FirebaseAuthTypes.User {
    admin?: boolean;
    nome?: string;
    success?: boolean;
    token?: string;
}
