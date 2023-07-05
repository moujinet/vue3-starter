declare interface IViteEnv {
  // {{ 应用相关
  APP_TITLE: string
  APP_DESCRIPTION: string
  // }}

  // {{ 构建相关
  VITE_ROOT_PATH: string
  VITE_SERVER_PORT: number
  VITE_SERVER_PROXY: [string, string][]

  VITE_USE_MOCK: boolean
  VITE_USE_MKCERT: boolean
  VITE_USE_INSPECT: boolean
  VITE_USE_IMAGEMIN: boolean
  VITE_USE_COMPRESSION: boolean
  VITE_USE_PWA: boolean
  VITE_USE_LEGACY: boolean
  VITE_USE_CHUNKS: boolean
  VITE_USE_DEFINE_MODEL: boolean
  VITE_USE_DEVTOOLS: boolean
  // }}
}
