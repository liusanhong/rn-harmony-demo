import { hapTasks } from '@ohos/hvigor-ohos-plugin';
import { createRNOHModulePlugin } from '@rnoh/hvigor-plugin';

export default {
  system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
  plugins: [
    createRNOHModulePlugin({
      nodeModulesPath: '../node_modules',
      codegen: null,
      autolinking: {
        excludeNpmPackages: [
          '@react-native-ohos/react-native-gesture-handler',
          '@react-native-ohos/react-native-screens',
        ],
      },
    }),
  ],
}