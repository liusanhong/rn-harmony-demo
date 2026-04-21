module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/assets': './src/assets',
          '@/iconfont': './src/iconfont',
          '@/components': './src/components',
          '@/modules': './src/modules',
          '@/models': './src/models',
          '@/config': './src/config',
          '@/navigators': './src/navigators',
          '@/styles': './src/styles',
          '@/services': './src/services',
          '@/utils': './src/utils',
          '@/images': './src/images',
          '@/constants': './src/constants',
          '@/comps': './src/comps',
        },
      },
    ],
  ],
};
