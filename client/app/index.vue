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
    {{$pwa}}
    <nuxt-pwa-manifest/>
    <nuxt-layout>
      <nuxt-page/>
    </nuxt-layout>
    <div
        v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
        class="pwa-toast"
        role="alert"
    >
      <div class="message">
          <span>
            Install PWA
          </span>
      </div>
      <button @click="$pwa.install()">
        Install
      </button>
      <button @click="$pwa.cancelInstall()">
        Cancel
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@colors";

.app {
  height: calc(var(--vh, 1vh) * 100);
  background: var($backspace);
  transition: .3s;
}

.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
