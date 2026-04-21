import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageItem = async key => {
    if (!key) {
        return void 0;
    }
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return void 0;
    } catch (e) {
        return void 0;
    }
};

export const setStorageItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        // saving error
        return false;
    }
};

export const removeItem = async (key, cb = () => {}) => {
    try {
        await AsyncStorage.removeItem(key, cb);
        return true;
    } catch (e) {
        return false;
    }
};
