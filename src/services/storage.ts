import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error - clearStorage: ', error);
    }
};

export const getStorage = async (key: string): Promise<string | null | undefined> => {
    try {
        const storageItem = await AsyncStorage.getItem(key);

        return storageItem;
    } catch (error) {
        console.error('Error - getStorage: ', error);
    }
};

export const getStorageJson = async (key: string): Promise<any> => {
    try {
        const storageItem = await AsyncStorage.getItem(key);

        return storageItem !== null ? JSON.parse(storageItem) : null;
    } catch (error) {
        console.error('Error - getStorageJson: ', error);

        await AsyncStorage.setItem(key, JSON.stringify(null));
    }
};

export const getStorageAllKeys = async (): Promise<string[] | undefined> => {
    try {
        const allStorageKeys = await AsyncStorage.getAllKeys();

        return allStorageKeys;
    } catch (error) {
        console.error('Error - getStorageAllKeys: ', error);
    }
};

export const getStorageMulti = async (array: string[]): Promise<[string, string | null][] | undefined> => {
    try {
        const storageMultiItem = await AsyncStorage.multiGet(array);

        return storageMultiItem;
    } catch (error) {
        console.error('Error - getStorageMulti: ', error);
    }
};

export const hasStorage = async (key: string): Promise<boolean | undefined> => {
    try {
        const hasStorageItem = await getStorage(key);

        return hasStorageItem ? true : false;
    } catch (error) {
        console.error('Error - hasStorage: ', error);
    }
};

export const mergeStorage = async (key: string, value: unknown): Promise<void> => {
    try {
        await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error - mergeStorage: ', error);
    }
};

export const mergeStorageMulti = async (arrayOfArray: [string][]): Promise<void> => {
    try {
        await AsyncStorage.multiMerge(arrayOfArray);
    } catch (error) {
        console.error('Error - mergeStorageMulti: ', error);
    }
};

export const removeStorage = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error - removeStorage: ', error);
    }
};

export const removeStorageMulti = async (array: string[]): Promise<void> => {
    try {
        await AsyncStorage.multiRemove(array);
    } catch (error) {
        console.error('Error - removeStorageMulti: ', error);
    }
};

export const setStorage = async (key: string, value: unknown): Promise<void> => {
    try {
        const storageItem = JSON.stringify(value);

        await AsyncStorage.setItem(key, storageItem);
    } catch (error) {
        console.error('Error - setStorage: ', error);
    }
};

export const setStorageMulti = async (arrayOfArray: [string][]): Promise<void> => {
    try {
        await AsyncStorage.multiSet(arrayOfArray);
    } catch (error) {
        console.error('Error - setStorageMulti: ', error);
    }
};
