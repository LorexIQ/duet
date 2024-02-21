<script setup lang="ts">
import useOnResize from "~/composables/useOnResize";

useOnResize(() => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}, { immediate: true });
</script>

<template>
  <div class="app">
    <nuxt-layout>
      <nuxt-page/>
    </nuxt-layout>
  </div>
</template>

<style lang="scss" scoped>
@import "@colors";

.app {
  height: calc(var(--vh, 1vh) * 100);
  background: var($backspace);
  transition: .3s;
}
</style>
