<script setup lang="ts">
const { $themes, $pwa } = useNuxtApp();

const themeStatusBar = computed(() => $themes.selectedTheme.value === 'light' ? '#ffffff' : '#0f172a');
const themeKeysStatusBar = [
  'theme-color',
  'msapplication-navbutton-color',
  'apple-mobile-web-app-status-bar-style'
];

useOnResize(() => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}, { immediate: true });

useHead({
  meta: themeKeysStatusBar.map(name => ({
    name,
    content: themeStatusBar
  }))
});
</script>

<template>
  <div class="app">
    {{ $pwa }}
    <ui-button @click="$pwa.install">install</ui-button>
    <nuxt-pwa-manifest/>
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
