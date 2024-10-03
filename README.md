# taro-drawings-factory
Taro 图纸工厂。安装条件：

- node 版本18
- 使用 yarn 安装（node 可能会安装失败）

```
yarn # 安装
npm start # 启动
```

本地启动服务后，可以输入 `http://localhost:9000/demo/` 访问 demo 列表。

# 注意

`packages` 是存分包的目录，它的子目录就对应一个分包，例如 `packages/demo/` 就表示演示分包，分包下面是页面。组件类不要存放在 `packages` 或 `packages/demo/` 下，避免被当成分包或页面编译了。
每个分包目录下，一定需要有一个 index.tsx/index.jsx/index.ts/index.js 文件，把分包的所有页面汇总进来，再设定一个缺省页面，具体参考 `packages/demo/index.tsx`。
