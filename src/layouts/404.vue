<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main flex="~ col center" h-screen>
    <div text="5xl primary" i-solar-emoji-funny-square-outline mb-3 />
    <RouterView />
    <div mt-8>
      <button
        rounded bg-primary px-8 py-2 text-sm text-white hover:op-80
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </main>
</template>

<route lang="yaml">
layout: true
</route>
