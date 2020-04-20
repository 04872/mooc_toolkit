# 基础架构

## 需求
- 使用 `TypeScript` 编写代码, *使用 ts 工具链*
- 使用 `parcel` 打包为浏览器可执行的 `js` 代码
- 区分开发环境与生产环境, *配置 `webpack` 多环境*
    - 开发环境启用 `SourceMap` 便于调试
    - 开发环境启用[模块热替换](https://www.webpackjs.com/concepts/hot-module-replacement/)
    - 生产环境尽量减小文件体积
- 使用语法检查库保证代码格式质量

## 分析

### 基本依赖
- `TypeScript`
- ~~`webpack`~~ ⚠️ 已放弃使用 `webpack`, 使用零配置的 `parcel`, 五分钟上手 🤣
- `parcel`
- `eslint`

## 构建项目
```bash
yarn global add parcel-bundler
```

增加 `script`, 指定入口文件为 `src/index.ts`
```json
{
  "scripts": {
    "dev": "parcel src/index.ts --port 9888",
    "build": "parcel build src/index.ts"
  },
}
```

```bash
# 开发
yarn dev
# 打包
yarn build
```

## 使用

1. 新建脚本
2. 在顶部脚本描述部分加入 `// @require      file:///Users/🤣/projects/mooc_toolkit/dist/index.js`, 注意这里的路径对应打包后的文件; 入口是 `src/index.ts`, 那默认的 `output` 就是 `dist/index.js`
3. (*进行中...*) 将更新检测放到脚本内或终端中完成
4. 保存代码, 等待浏览器刷新页面

## 参考链接
- [Parcel](https://parceljs.org/cli.html)
- [eslint started](https://eslint.bootcss.com/docs/user-guide/getting-started)
