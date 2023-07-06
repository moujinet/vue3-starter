<template>
  <header
    flex="~ v-center justify-between"
    p="x-12 y-6"
    border="b base"
    bg-white dark:bg-base
  >
    <Logo />
    <div flex="~ v-center gap-x-8">
      <a href="/" text-sm text-link-base>
        首页
      </a>
      <a href="/guide" text-sm text-link-base>
        开始使用
      </a>
      <a href="/config" text-sm text-link-base>
        配置说明
      </a>
      <a href="#" @click.prevent="toggleDark">
        <div i-solar-sun-2-outline dark:i-solar-moon-outline />
      </a>
      <a href="https://github.com/moujinet/vue3-starter" target="_blank">
        <div i-codicon-github />
      </a>
    </div>
  </header>
</template>
