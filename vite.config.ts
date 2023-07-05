import { URL, fileURLToPath } from 'node:url'
import { loadEnv, splitVendorChunkPlugin } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueRoutesGenerate from 'vite-plugin-vue-routes-generate'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Compression from 'vite-plugin-compression'
import Imagemin from 'vite-plugin-imagemin'
import Inspect from 'vite-plugin-inspect'
import Mkcert from 'vite-plugin-mkcert'
import Legacy from '@vitejs/plugin-legacy'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'

import { wrapperEnv } from './build/env'
import { createProxy } from './build/proxy'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const {
    VITE_SERVER_PROXY,
    VITE_SERVER_PORT,
    VITE_ROOT_PATH,
    VITE_USE_MKCERT,
    VITE_USE_IMAGEMIN,
    VITE_USE_COMPRESSION,
    VITE_USE_INSPECT,
    VITE_USE_CHUNKS,
    VITE_USE_LEGACY,
  } = viteEnv
  const isBuild = command === 'build'

  const plugins = [
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: true,
      },
    }),

    // https://github.com/moujinet/vite-plugin-vue-routes-generate
    VueRoutesGenerate({
      defaultLayout: 'default',
      extensions: ['vue', 'md'],
      dirs: [
        'src/pages',
        'src/layouts',
      ],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'types/auto-imports.d.ts',
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      dts: 'types/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperClasses: 'prose m-auto text-left',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki)
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
  ]

  // https://github.com/antfu/vite-plugin-compression
  if (VITE_USE_COMPRESSION) {
    plugins.push(Compression({
      ext: '.gz',
      deleteOriginFile: false,
    }))

    plugins.push(Compression({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile: false,
    }))
  }

  // https://github.com/antfu/vite-plugin-imagemin
  if (VITE_USE_IMAGEMIN) {
    plugins.push(Imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }))
  }

  // https://github.com/antfu/vite-plugin-inspect
  VITE_USE_INSPECT && plugins.push(Inspect())

  // https://github.com/liuweiGL/vite-plugin-mkcert
  VITE_USE_MKCERT && plugins.push(Mkcert({
    source: 'coding',
  }))

  // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
  VITE_USE_LEGACY && plugins.push(Legacy({
    targets: ['defaults', 'not IE 11'],
  }))

  // https://cn.vitejs.dev/guide/build.html
  VITE_USE_CHUNKS && plugins.push(splitVendorChunkPlugin())

  return {
    base: VITE_ROOT_PATH,

    envPrefix: ['VITE_', 'APP_'],

    server: {
      https: VITE_USE_MKCERT,
      host: true,
      port: VITE_SERVER_PORT,
      proxy: createProxy(VITE_SERVER_PROXY),
      fs: {
        strict: true,
      },
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },

    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
    },

    esbuild: {
      pure: isBuild ? ['console.log', 'debugger'] : [],
    },

    plugins,

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse'],
      },
    },
  }
}
