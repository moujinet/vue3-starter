import { splitVendorChunkPlugin } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueRoutesGenerate from 'vite-plugin-vue-routes-generate'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'
import Compression from 'vite-plugin-compression'
import Imagemin from 'vite-plugin-imagemin'
import Inspect from 'vite-plugin-inspect'
import Mkcert from 'vite-plugin-mkcert'
import Legacy from '@vitejs/plugin-legacy'
import VueDevTools from 'vite-plugin-vue-devtools'

export function createVitePlugins(env: IViteEnv, isBuild: boolean) {
  const {
    VITE_USE_MKCERT,
    VITE_USE_IMAGEMIN,
    VITE_USE_COMPRESSION,
    VITE_USE_INSPECT,
    VITE_USE_CHUNKS,
    VITE_USE_LEGACY,
    VITE_USE_DEFINE_MODEL,
    VITE_USE_DEVTOOLS,
  } = env

  const plugins = [
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: VITE_USE_DEFINE_MODEL,
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
      dts: 'src/auto-imports.d.ts',
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
      dts: 'src/components.d.ts',
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
  VITE_USE_IMAGEMIN && plugins.push(Imagemin({
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

  // https://github.com/antfu/vite-plugin-inspect
  !isBuild && VITE_USE_INSPECT && plugins.push(Inspect())

  // https://github.com/liuweiGL/vite-plugin-mkcert
  !isBuild && VITE_USE_MKCERT && plugins.push(Mkcert({
    source: 'coding',
  }))

  // https://github.com/webfansplz/vite-plugin-vue-devtools
  !isBuild && VITE_USE_DEVTOOLS && plugins.push(VueDevTools())

  // https://cn.vitejs.dev/guide/build.html
  isBuild && VITE_USE_CHUNKS && plugins.push(splitVendorChunkPlugin())

  // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
  isBuild && VITE_USE_LEGACY && plugins.push(Legacy({
    targets: ['defaults', 'not IE 11'],
  }))

  return plugins
}
