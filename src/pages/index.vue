<script lang="ts" setup>
const router = useRouter()

const command = ref('git clone https://github.com/moujinet/vue3-starter')
const { copy, copied } = useClipboard({ source: command })
</script>

<template>
  <div
    class="mx-50%"
    p="y-100px"
    text="center 5xl"
    mxa font-bold
  >
    <span class="hero">
      VUE3 快速起手项目
    </span>
    <br>
    <span class="hero" mt-7 text-4xl>
      文件路由，布局系统，UnoCSS
    </span>
    <br>
    <span class="hero" mt-2.5 text-4xl>
      调试工具集成，Markdown 支持
    </span>
    <br>
  </div>

  <div flex="~ col v-center">
    <code
      flex="~ row v-center justify-between"
      p="x-4 y-2"
      border="~ base"
      text="sm secondary"
      rounded-md
    >
      {{ command }}
      <div v-if="!copied" i-carbon-copy ml-3 cursor-pointer hover:text-highlight @click="copy()" />
      <div v-else i-carbon-checkmark ml-3 text-primary />
    </code>
  </div>

  <div mt-30 text-center>
    <button
      class="btn"
      @click="router.push('/guide')"
    >
      现在开始
    </button>
  </div>
</template>

<style scoped>
.hero {
  --at-apply: inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray400 dark:from-gray-50 dark:to-gray-800 ;
}
.btn {
  --at-apply: font-semibold text-primary dark:text-white shadow-lg shadow-cyan-500/50;
  padding: 10px 50px;
  border: double 4px transparent;
  border-radius: 12px;
  background-image: linear-gradient(var(--c-bg-base), var(--c-bg-base)), radial-gradient(circle at top left, var(--c-gradient-from), var(--c-gradient-to));
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
