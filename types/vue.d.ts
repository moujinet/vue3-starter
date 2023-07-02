/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-routes-generate/client" />

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '~routes' {
  import type { RouteRecordRaw } from 'vue-router'
  const routes: RouteRecordRaw[]
  export default routes
}

declare module '~routes/meta' {
  import type { PageRouteMeta } from 'vite-plugin-vue-routes-generate'
  const routesMeta: PageRouteMeta[]
  export default routesMeta
}