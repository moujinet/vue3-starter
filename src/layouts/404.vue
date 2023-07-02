<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main flex="~ col center" h-screen>
    <div text="5xl primary" mb-3 i-solar-emoji-funny-square-outline />
    <RouterView />
    <div mt-8>
      <button
        text-sm px-8 py-2 bg-primary text-white rounded hover:op-80
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
