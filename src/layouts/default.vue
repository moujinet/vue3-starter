<template>
  <main py-10>
    <div flex="~ col center" py-10>
      <RouterView />
    </div>

    <div flex="~ col center">
      <NavMain />
    </div>
  </main>
</template>

<route lang="yaml">
layout: true
</route>
