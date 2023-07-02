<script setup lang="ts">
useHead({
  title: 'Vue3 + Vite Starter Template',
  meta: [
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#03BAB1' : '#fff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
