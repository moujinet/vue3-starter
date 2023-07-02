<template>
  <div flex="~ row v-center gap-x-8">
    <NavItem icon="i-solar-home-smile-outline" link="/" title="Home" />
    <NavItem icon="i-solar-document-text-outline" link="/about" title="About" />
    <NavItem
      icon="i-solar-sun-2-outline dark:i-solar-moon-outline"
      title="Toggle Color Theme"
      @click="toggleDark"
    />
    <NavItem icon="i-codicon-github" link="/about" title="Github repo" />
  </div>
</template>s
