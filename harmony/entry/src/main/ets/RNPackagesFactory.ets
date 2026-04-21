import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import RnohReactNativeHarmonyGestureHandlerPackage from '@react-native-ohos/react-native-gesture-handler';
import { SafeAreaViewPackage } from '@react-native-ohos/react-native-safe-area-context/ts';
import RNOHScreensPackage from '@react-native-ohos/react-native-screens';
import { ReanimatedPackage } from '@react-native-ohos/react-native-reanimated/ts';
import { AsyncStoragePackage } from '@react-native-ohos/async-storage/ts';
import { ShakePackage } from '@react-native-ohos/react-native-shake/ts';
import { SvgPackage } from '@react-native-ohos/react-native-svg/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new RnohReactNativeHarmonyGestureHandlerPackage(ctx),
    new SafeAreaViewPackage(ctx),
    new RNOHScreensPackage(ctx),
    new ReanimatedPackage(ctx),
    new AsyncStoragePackage(ctx),
    new ShakePackage(ctx),
    new SvgPackage(ctx),
  ];
}
