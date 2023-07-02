<script lang="ts" setup>
const props = defineProps<{
  title?: string
  icon?: string
  link?: string
}>()

const router = useRouter()

function onClick() {
  props.link && router.push(props.link)
}
</script>

<template>
  <button text-link-base :title="title" @click="onClick">
    <div :class="icon" />
  </button>
</template>
