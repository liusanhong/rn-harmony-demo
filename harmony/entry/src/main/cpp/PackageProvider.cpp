#include "RNOH/PackageProvider.h"
#include "generated/RNOH/generated/BaseReactNativeGestureHandlerPackage.h"
#include "SafeAreaViewPackage.h"
#include "RnohReactNativeHarmonyScreensPackage.h"
#include "ReanimatedPackage.h"
#include "AsyncStoragePackage.h"
#include "ShakePackage.h"
#include "SVGPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
        std::make_shared<BaseReactNativeGestureHandlerPackage>(ctx),
        std::make_shared<SafeAreaViewPackage>(ctx),
        std::make_shared<rnoh::RnohReactNativeHarmonyScreensPackage>(ctx),
        std::make_shared<ReanimatedPackage>(ctx),
        std::make_shared<AsyncStoragePackage>(ctx),
        std::make_shared<ShakePackage>(ctx),
        std::make_shared<SVGPackage>(ctx),
    };
}
