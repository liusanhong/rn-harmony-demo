# HarmonyRNBase

基于 React Native 的鸿蒙（HarmonyOS）应用开发基础项目。本项目展示了如何将 React Native 应用适配到鸿蒙平台。

## 项目简介

HarmonyRNBase 是一个跨平台移动应用开发项目，支持以下平台：

- **Android** - 原生 Android 应用
- **iOS** - 原生 iOS 应用
- **HarmonyOS** - 鸿蒙原生应用

项目使用 [RNOH (React Native OpenHarmony)](https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/README.md) 框架实现 React Native 在鸿蒙系统上的运行。

## 技术栈

### 前端
- React Native 0.77.1
- React 18.3.1
- TypeScript 5.0.4

### 鸿蒙原生
- ArkTS (鸿蒙应用开发语言)
- RNOH 0.77.40
- Hvigor 构建工具

## 目录结构

```
harmony_rn/
├── HarmonyRNBase/               # React Native 主项目
│   ├── android/                 # Android 平台配置
│   ├── ios/                     # iOS 平台配置
│   ├── harmony/                 # 鸿蒙平台配置
│   ├── App.tsx                  # 主应用组件
│   ├── index.js                 # 应用入口
│   └── package.json             # 依赖管理
│
└── harmony_native/              # 鸿蒙原生项目
    ├── entry/                   # 鸿蒙应用入口模块
    │   ├── src/main/ets/        # ArkTS 源码
    │   │   ├── entryability/    # 应用能力
    │   │   ├── pages/           # 页面
    │   │   └── RNPackagesFactory.ets
    │   └── oh-package.json5     # 鸿蒙包配置
    ├── AppScope/                # 应用作用域配置
    └── build-profile.json5      # 构建配置
```

## 环境要求

### React Native 开发环境
- Node.js >= 18
- JDK 17+
- Android Studio (Android 开发)
- Xcode 15+ (iOS 开发，仅 macOS)

### 鸿蒙开发环境
- DevEco Studio 5.0+
- HarmonyOS SDK 6.0.0(20)

## 快速开始

### 1. 安装依赖

```bash
cd HarmonyRNBase
yarn install
```
`
### 2. 运行应用`

**开发模式（鸿蒙 Bundle 生成）**
```bash
yarn dev
```

**Android**
```bash
yarn android
```

**iOS**
```bash
yarn ios
```

**启动 Metro 服务器**
```bash
yarn start
```

## 鸿蒙平台说明

### Bundle 加载方式

项目支持多种 JavaScript Bundle 加载方式：

| 方式 | 用途 | 说明 |
|------|------|------|
| MetroJSBundleProvider | 开发调试 | 从 Metro 服务器实时加载 |
| FileJSBundleProvider | 本地文件 | 从文件系统加载 Bundle |
| ResourceJSBundleProvider | 生产环境 | 从应用资源加载 |

### 鸿蒙构建

1. 使用 DevEco Studio 打开 `harmony_native` 目录
2. 配置签名信息
3. 构建并运行到鸿蒙设备

yarn dev后，将

本地修改bundle
将HarmonyRNBase/harmony/entry/src/main/resources/rawfile里面的 bundle 文件和 assets 图片放在 harmony_native/entry/src/main/resources/rawfile 路径下，在 entry/src/main/ets/pages/Index.ets 中使用。

hdc rport tcp:8081 tcp:8081


### Harmony 第三方库
[第三方库地址](https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/README.md)

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 启动 Metro 服务器 |
| `npm run android` | 运行 Android 应用 |
| `npm run ios` | 运行 iOS 应用 |
| `npm run dev` | 生成鸿蒙 Bundle (开发模式) |
| `npm test` | 运行测试 |
| `npm run lint` | 代码检查 |

## 项目特性

- 跨平台支持 (Android / iOS / HarmonyOS)
- TypeScript 类型支持
- 支持热重载和调试模式
- 暗色/亮色主题适配
- 多种 Bundle 加载方式

## 相关资源

- [React Native 官方文档](https://reactnative.dev/)
- [React Native OpenHarmony](https://github.com/react-native-oh-library)
- [鸿蒙开发者文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/application-dev-guide-V5)
- [搭建流水线](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-command-line-building-app-V5)
- [非公开发布](https://developer.huawei.com/consumer/cn/doc/app/agc-help-non-public-release-0000002047208149)
- [GITEE文档](https://gitee.com/openharmony-sig/ohos_react_native/blob/master/docs/zh-cn/README.md#https://gitee.com/react-native-oh-library/usage-docs)
- [华为仓库](https://gitcode.com/org/openharmony-sig/repos)
- [第三方库文档](https://gitcode.com/OpenHarmony-RN/usage-docs/blob/master/zh-cn/react-native-gesture-handler.md)

## License

MIT
