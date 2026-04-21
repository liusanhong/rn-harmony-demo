project(rnapp)
cmake_minimum_required(VERSION 3.4.1)
set(CMAKE_SKIP_BUILD_RPATH TRUE)
set(OH_MODULE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
set(OH_MODULES_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
set(RNOH_APP_DIR "${CMAKE_CURRENT_SOURCE_DIR}")

set(RNOH_CPP_DIR "${OH_MODULE_DIR}/@rnoh/react-native-openharmony/src/main/cpp")
set(RNOH_GENERATED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/generated")
set(CMAKE_ASM_FLAGS "-Wno-error=unused-command-line-argument -Qunused-arguments")
set(CMAKE_CXX_FLAGS "-fstack-protector-strong -Wl,-z,relro,-z,now,-z,noexecstack -s -fPIE -pie")
add_compile_definitions(WITH_HITRACE_SYSTRACE)
set(WITH_HITRACE_SYSTRACE 1) # for other CMakeLists.txt files to use

add_subdirectory("${RNOH_CPP_DIR}" ./rn)

# 手动链接的第三方库
set(RNOH_GESTURE_HANDLER_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/react-native-gesture-handler/src/main/cpp")
set(RNOH_SAFE_AREA_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/react-native-safe-area-context/src/main/cpp")
set(RNOH_SCREENS_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/react-native-screens/src/main/cpp")
set(RNOH_REANIMATED_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/react-native-reanimated/src/main/cpp")
set(RNOH_ASYNC_STORAGE_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/async-storage/src/main/cpp")
set(RNOH_SHAKE_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/react-native-shake/src/main/cpp")
set(RNOH_SVG_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/react-native-svg/src/main/cpp")

add_subdirectory("${RNOH_GESTURE_HANDLER_CPP_DIR}" ./gesture_handler)
add_subdirectory("${RNOH_SAFE_AREA_CPP_DIR}" ./safe_area)
add_subdirectory("${RNOH_SCREENS_CPP_DIR}" ./rnoh_screens)
add_subdirectory("${RNOH_REANIMATED_CPP_DIR}" ./reanimated)
add_subdirectory("${RNOH_ASYNC_STORAGE_CPP_DIR}" ./rnoh_async_storage)
add_subdirectory("${RNOH_SHAKE_CPP_DIR}" ./shake_package)
add_subdirectory("${RNOH_SVG_CPP_DIR}" ./svg)

add_library(rnoh_app SHARED
    "./PackageProvider.cpp"
    "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)

target_link_libraries(rnoh_app PUBLIC
    rnoh
    rnoh_gesture_handler
    rnoh_safe_area
    rnoh_screens
    rnoh_reanimated
    rnoh_async_storage
    rnoh_shake
    rnoh_svg
    libdeviceinfo_ndk.z.so
)
