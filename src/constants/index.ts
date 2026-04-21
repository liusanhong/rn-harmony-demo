import {Dimensions, Platform} from 'react-native';

export default class Constants {
    public static debug: boolean = __DEV__;
    public static isAndroid: boolean = Platform.OS === 'android';
    public static isIos: boolean = Platform.OS === 'ios';
    public static screenWidth = Dimensions.get('window').width;
    public static screenHeight = Dimensions.get('window').height;
}
