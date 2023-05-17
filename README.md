<p align="center">
  <img height="200" src="./assets/kv.png" alt="unplugin-dns-prefetch">
</p>
<p align="center"> <a href="./README_en.md">English</a> | 简体中文</p>


自动检测收集打包文件中的外部链接，提升到index.html的head顶部生成dns-prefetch，让dns更早的去做解析

## 🧩 使用
<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteDnsPrefetchPlugin } from 'unplugin-dns-prefetch'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteDnsPrefetchPlugin(),
  ],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { rollupDnsPrefetchPlugin } from 'unplugin-dns-prefetch'
export default {
  plugins: [
    rollupDnsPrefetchPlugin(),
  ],
}
```

</details>
<br>
<details>
<summary>Webpack</summary>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-dns-prefetch').webpackDnsPrefetchPlugin(),
  ],
}
```
</details>
<br>
<details>
<summary>Vue CLI</summary>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-dns-prefetch').webpackDnsPrefetchPlugin(),
    ],
  },
}
```

</details>
<br>
<details>
<summary>ESBuild</summary>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import { esbuildDnsPrefetchPlugin } from 'unplugin-dns-prefetch'

build({
  plugins: [esbuildDnsPrefetchPlugin()],
})
```
</details>


## License
[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>


