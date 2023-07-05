import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import routes from '~routes'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'

const pinia = createPinia()
const head = createHead()
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

createApp(App)
  .use(router)
  .use(head)
  .use(pinia)
  .mount('#app')
