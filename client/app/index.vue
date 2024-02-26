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
    <nuxt-pwa-manifest/>

    <div class="app__layout">
      <nuxt-layout>
        <nuxt-page/>
      </nuxt-layout>
    </div>
    <div class="app__footer">
      <system-install-app-ad/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@colors";

.app {
  display: flex;
  flex-direction: column;
  max-width: min(600px, 100%);
  width: 100%;
  margin: 0 auto;
  height: calc(var(--vh, 1vh) * 100);
  background: var($backspace);
  transition: .3s;

  &__layout {
    flex-grow: 1;
  }
  &__footer {
  }
}
</style>
