---
name: git-commit
description: 生成符合企业内部规范的 Git Commit Message。当用户说"提交代码"、"commit"、"生成提交信息"或需要创建 git commit 时使用。
---

# Git Commit Message 规范

此 Skill 用于生成符合企业内部 Conventional Commits 规范的 Git Commit Message。

## 规范要求

### 格式

```
<type>(<scope>): <subject>

- <变更点1>
- <变更点2>
- <变更点3>
  ...

Committed at: <提交时间，格式：YYYY-MM-DD HH:mm>
Committed by: <提交人姓名或账号>
```

### Type 类型（必须为以下之一）

| Type     | 说明                            |
| -------- | ------------------------------- |
| feat     | 新功能                          |
| fix      | Bug 修复                        |
| docs     | 文档变更                        |
| style    | 代码格式（不影响功能）          |
| refactor | 重构（既不是新功能也不是修复）  |
| perf     | 性能优化                        |
| build    | 构建系统或外部依赖变更          |
| ci       | CI 配置文件和脚本变更           |
| chore    | 其他不修改 src 或测试文件的变更 |

### Scope 规则

- **必须通过交互询问用户获取任务编号**
- **任务编号是必填项，不允许跳过**
- 如果用户没有任务编号，必须提醒其先获取任务编号再提交
- **历史记录**：保存最近 3 次使用的任务编号，供用户快速选择
- **分支提取**：如果当前分支名包含 US 编号（如 `feature/US20260225169795-xxx`），自动提取并作为优先选项

### 历史记录存储

历史记录存储在 `~/.claude/.git-commit-history.json` 文件中，格式如下：

```json
{
  "recentScopes": ["US20260225169795", "US20260225123456", "US20260225987654"]
}
```

- 最多保存 3 条记录
- 每次成功提交后，将使用的 scope 添加到历史记录开头
- 如果已存在则移到开头（去重）
- 超过 3 条则移除最旧的

### 内容要求

1. **Subject（第一行）不得超过 100 个字符, 总结描述本次变更内容, 其他变更内容详细展示在下方, **
2. **使用中文描述**
3. **禁止出现以下字段**（会导致合并检查失败）：
   - `test`
   - `dev`
   - 任何包含 test/dev 的词汇

### 破坏性改动

如果是破坏性改动，必须在正文开头注明：

```
BREAKING CHANGE: 破坏性变更说明
```

## 执行步骤

当用户请求提交代码时，按以下步骤执行：

### 1. 检查变更

运行以下命令查看变更：

```bash
git status
git diff --staged
git diff
```

### 2. 询问任务编号

**在询问之前，先收集可选的任务编号：**

#### 2.1 从分支名提取 US 编号

```bash
# 获取当前分支名并提取 US 编号
git branch --show-current | grep -oE 'US[0-9]+' | head -1
```

如果匹配到 US 编号，将其作为优先选项。

#### 2.2 读取历史记录

读取 `~/.claude/.git-commit-history.json` 文件获取最近使用的任务编号：

```bash
cat ~/.claude/.git-commit-history.json 2>/dev/null || echo '{"recentScopes":[]}'
```

#### 2.3 构建选项列表

使用 AskUserQuestion 工具询问用户，选项构建规则：

1. **优先选项**：如果分支名提取到 US 编号，标记为 "(从分支名提取)"
2. **历史记录**：显示最近 3 条历史记录
3. **其他**：让用户自定义输入

选项示例：
- `US20260225169795 (当前分支)` - 从分支名提取
- `US20260225169795` - 历史记录 1
- `US20260225123456` - 历史记录 2
- `US20260225987654` - 历史记录 3
- `其他...` - 自定义输入

**必须使用 AskUserQuestion 工具询问用户：**

- 问题："请选择或输入 CODEARTS 任务编号"
- **任务编号是必填项，不允许跳过**
- 如果用户表示没有任务编号，提醒其必须先获取任务编号才能提交代码

#### 2.4 更新历史记录

用户选择任务编号后，更新历史记录文件：

```bash
# 读取现有历史，更新后写回
# 伪代码逻辑：
# 1. 读取 recentScopes 数组
# 2. 将选中的 scope 移到数组开头（如已存在则先移除）
# 3. 保持最多 3 条记录
# 4. 写回文件
```

使用以下命令更新历史记录：

```bash
# 创建目录（如不存在）
mkdir -p ~/.claude

# 使用 jq 更新历史记录（如果有的话）
# 或者使用 node/python 等脚本语言处理 JSON
```

### 3. 分析变更类型

根据变更内容确定：

- **type**: 根据变更性质选择合适的类型
- **scope**: 使用用户输入的任务编号
- **description**: 用中文简洁描述变更内容

### 4. 生成 Commit Message

按照格式生成 commit message，确保：

- [ ] type 是允许的类型之一
- [ ] scope 使用用户确认的任务编号
- [ ] subject 不超过 50 个字符
- [ ] 使用中文描述
- [ ] 不包含 test/dev 等禁止字段

### 5. 执行提交

```bash
git add <files>
git commit -m "<type>(<scope>): <中文描述>"
```

### 6. 更新历史记录

提交成功后，将使用的 scope 保存到历史记录：

```bash
# 使用以下脚本更新历史记录
SCOPE="<用户选择的scope>"
HISTORY_FILE="$HOME/.claude/.git-commit-history.json"

# 确保目录存在
mkdir -p "$(dirname "$HISTORY_FILE")"

# 读取现有历史或创建新的
if [ -f "$HISTORY_FILE" ]; then
  EXISTING=$(cat "$HISTORY_FILE")
else
  EXISTING='{"recentScopes":[]}'
fi

# 使用 node 处理 JSON（推荐，跨平台兼容）
node -e "
const fs = require('fs');
const scope = process.argv[1];
const file = process.argv[2];
let data = {recentScopes: []};
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch(e) {}
// 移除已存在的
data.recentScopes = data.recentScopes.filter(s => s !== scope);
// 添加到开头
data.recentScopes.unshift(scope);
// 保留最多 3 条
data.recentScopes = data.recentScopes.slice(0, 3);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
" "$SCOPE" "$HISTORY_FILE"
```

## 示例

### 新功能

```
feat(US20260225169795): 增加 OAuth2 登录支持
```

### Bug 修复

```
fix(US20260225169795): 修复用户登录状态丢失问题
```

### 重构

```
refactor(US20260225169795): 优化 API 请求错误处理逻辑
```

### 文档更新

```
docs(US20260225169795): 更新 README 安装说明
```

### 样式调整

```
style(US20260225169795): 统一代码缩进格式
```

### 性能优化

```
perf(US20260225169795): 优化列表渲染性能
```

### 破坏性变更

```
refactor(US20260225169795): 重构用户认证模块

BREAKING CHANGE: 移除旧版 API 接口，需升级客户端版本
```

## 注意事项

1. **任务编号是必填项**：每次提交前都要通过 AskUserQuestion 询问用户，**不允许跳过**
2. **始终使用中文**描述变更内容
3. **检查 subject 长度**，超过 50 字符需精简
4. **避免禁止字段**：确保 commit message 中不出现 test、dev 等
5. **多个变更合并**：如果暂存区有多个不相关变更，建议分开提交
6. **历史记录**：自动保存最近 3 次使用的任务编号，方便快速选择
7. **分支提取**：优先从当前分支名提取 US 编号作为推荐选项
