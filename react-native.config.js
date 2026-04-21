module.exports = {
  dependencies: {
    // 排除鸿蒙适配版的 iOS 自动链接，使用原版的 iOS 原生代码
    '@react-native-ohos/react-native-shake': {
      platforms: {
        ios: null,
      },
    },
  },
};
