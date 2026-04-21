---
name: rnoh-link-package
description: 为鸿蒙端（RNOH）链接第三方 React Native 包。当添加 @react-native-ohos/ 前缀的鸿蒙适配包、或鸿蒙端报 "Package not registered" / "Module not found" 时使用。
---

# 鸿蒙端（RNOH）第三方包链接指南

## 概述

React Native 三方库适配鸿蒙时，需要判断是否支持 Autolink，不支持则手动链接。本技能覆盖判断流程和手动链接的完整步骤。

## 适用场景

- 新增 `@react-native-ohos/` 前缀的鸿蒙适配包
- 三方库在鸿蒙端报 "Package not registered" 或 "Module not found"
- 需要为鸿蒙包添加权限配置

## 第一步：判断 Autolink 支持

```bash
# 检查包是否有 harmony 字段（autolink 标志）
node -e "const p = require('@react-native-ohos/<package-name>/package.json'); console.log('harmony:', JSON.stringify(p.harmony))"
```

| `harmony` 字段 | 含义 | 操作 |
|---|---|---|
| 有 `alias` 字段 | 支持 Autolink | 跳到「Autolink 配置」 |
| 无 `harmony` 字段 | 不支持，需手动链接 | 继续第二步 |

**查阅文档确认：** 访问 `https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/<package-name>.md` 查看官方 Link 表格，确认对应版本是否支持 autolink。

## Autolink 配置（支持 Autolink 的包）

运行 autolink 命令自动生成配置：
```bash
npx react-native link-harmony
```

检查生成的文件是否包含新包：
- `harmony/entry/src/main/ets/RNOHPackagesFactory.ets`
- `harmony/entry/src/main/cpp/RNOHPackagesFactory.h`
- `harmony/entry/src/main/cpp/autolinking.cmake`

仍需手动补充 oh-package 依赖和权限（见下文）。

## 手动链接（不支持 Autolink 的包）

需修改 **6 个文件**，按以下顺序操作：

### 1. oh-package.json5 依赖（两个文件都要改）

**根目录** `harmony/oh-package.json5`：
```
"dependencies": {
  ...
  "@react-native-ohos/<package-name>": "file:../node_modules/@react-native-ohos/<package-name>/harmony/<har-file>.har",
}
```

**entry 模块** `harmony/entry/oh-package.json5`：
```
"dependencies": {
  ...
  "@react-native-ohos/<package-name>": "file:../../node_modules/@react-native-ohos/<package-name>/harmony/<har-file>.har",
}
```

> `.har` 文件路径在 `node_modules/@react-native-ohos/<package-name>/harmony/` 目录下查找。

### 2. 权限配置

`harmony/entry/src/main/module.json5` — 在 `module` 对象内添加 `requestPermissions`：

```json5
{
  "module": {
    ...
    "requestPermissions": [
      {
        "name": "ohos.permission.ACCELEROMETER"
      }
    ],
    ...
  }
}
```

> 权限名称查阅包的官方文档「权限要求」章节。

### 3. ArkTS 侧注册

`harmony/entry/src/main/ets/RNPackagesFactory.ets`：

```typescript
import { XxxPackage } from '@react-native-ohos/<package-name>/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    ...existingPackages,
    new XxxPackage(ctx),
  ];
}
```

> Package 类名和导入路径查阅 `.har` 包内的 ArkTS 源码或官方文档。

### 4. C++ 侧配置（两个文件）

**CMakeLists.txt** `harmony/entry/src/main/cpp/CMakeLists.txt`：

```cmake
# 添加路径变量
set(RNOH_XXX_CPP_DIR "${OH_MODULE_DIR}/@react-native-ohos/<package-name>/src/main/cpp")

# 添加子目录
add_subdirectory("${RNOH_XXX_CPP_DIR}" ./<build-dir>)

# 添加链接库
target_link_libraries(rnoh_app PUBLIC
    ...
    rnoh_<link-name>
)
```

> 库名查看包内 `src/main/cpp/CMakeLists.txt` 的 `add_library` 或 `target` 名称。

**PackageProvider.cpp** `harmony/entry/src/main/cpp/PackageProvider.cpp`：

```cpp
#include "XxxPackage.h"

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
        ...existing,
        std::make_shared<XxxPackage>(ctx),
    };
}
```

> 头文件名查看包内 `src/main/cpp/` 目录。

## 验证清单

- [ ] `harmony/oh-package.json5` 包含 .har 依赖
- [ ] `harmony/entry/oh-package.json5` 包含 .har 依赖
- [ ] `module.json5` 包含所需权限
- [ ] `RNPackagesFactory.ets` 导入并注册了 Package
- [ ] `CMakeLists.txt` 添加了 cpp 子目录和链接库
- [ ] `PackageProvider.cpp` include 了头文件并注册了 Package
- [ ] 所有引用的类名、文件名与包内实际一致（不要猜测，要去 node_modules 中确认）

## 常见错误

| 错误 | 原因 | 修复 |
|------|------|------|
| `.har` 文件找不到 | 路径错误或包未安装 | `ls node_modules/@react-native-ohos/<pkg>/harmony/` 确认 |
| ArkTS 导入路径错误 | 未加 `/ts` 后缀 | 查看包内 `harmony/` 下的 Index 导出 |
| C++ 链接失败 | link 库名与 CMakeLists 内定义不一致 | 查看包内 `src/main/cpp/CMakeLists.txt` |
| 权限未生效 | `requestPermissions` 放错位置 | 必须在 `module` 对象的一级层级 |
| oh-package 同步失败 | 根目录和 entry 目录只改了一个 | 两个 oh-package.json5 必须同时添加 |
