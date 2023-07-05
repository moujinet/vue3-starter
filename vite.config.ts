import { URL, fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'

import { createVitePlugins } from './build/plugins'
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
  } = viteEnv
  const isBuild = command === 'build'

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

    plugins: createVitePlugins(viteEnv, isBuild),

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
