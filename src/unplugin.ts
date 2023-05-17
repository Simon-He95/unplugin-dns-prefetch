import fsp from 'node:fs/promises'
import type { UnpluginOptions } from 'unplugin'
import { createUnplugin } from 'unplugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const urlRegex = require('url-regex')

export const unplugin = createUnplugin(() => {
  const hostPattern = /(https?:\/\/[^/]*)/i
  const urls = new Set()
  const htmls: [string, string][] = []
  return {
    name: 'unplugin-dns-prefetch',
    // webpack's id filter is outside of loader logic,
    // an additional hook is needed for better perf on webpack
    enforce: 'post',
    // more hooks coming
    writeBundle(options: any, fileAssets: any) {
      const { dir } = options

      return Promise.all(Object.keys(fileAssets).map(async (filePath) => {
        const realFilePath = `${dir}/${filePath}`
        const content = await fsp.readFile(realFilePath, 'utf-8')
        if (filePath.endsWith('.html'))
          htmls.push([realFilePath, content])
        const urlMatches = content.match(urlRegex({ strict: true }))
        if (!urlMatches)
          return
        urlMatches.forEach((url) => {
          const hostMatch = url.match(hostPattern)
          if (hostMatch)
            urls.add(hostMatch[1])
        })
      })).then(() => {
        // 处理urls, 写入index.html
        if (urls.size === 0)
          return
        const links = [...urls].map(url => `<link rel="dns-prefetch" href="${url}">`).join('\n  ')
        for (const [url, content] of htmls) {
          // 在content -> head后面添加links
          const newHTML = content.replace(/(<head[^>]*>)/, (_, head) => `${head}\n  ${links}`)
          // 写入原本的html中
          fsp.writeFile(url, newHTML, 'utf-8')
        }
      })
    },
  } as UnpluginOptions
})

export const viteDnsPrefetchPlugin = unplugin.vite
export const rollupDnsPrefetchPlugin = unplugin.rollup
export const webpackDnsPrefetchPlugin = unplugin.webpack
export const rspackDnsPrefetchPlugin = unplugin.rspack
export const esbuildDnsPrefetchPlugin = unplugin.esbuild
