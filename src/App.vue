<script setup lang="ts">
useHead({
  title: import.meta.env.APP_TITLE,
  meta: [
    {
      name: 'description',
      content: import.meta.env.APP_DESCRIPTION,
    },
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
