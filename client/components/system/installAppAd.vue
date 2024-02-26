<script setup lang="ts">
const { $pwa } = useNuxtApp();
</script>

<template>
  <transition name="install-app-ad-transition">
    <div
        class="install-app-ad"
        v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
    >
      <img src="/logo.png" alt="logo" @click="$pwa.install()">
      <span @click="$pwa.install()">Приложение доступно для скачивания!</span>
      <ui-icon
          icon="Times"
          size="30px"
          @click="$pwa.cancelInstall()"
      />
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import '@colors';

.install-app-ad {
  display: grid;
  grid-template-columns: 40px auto 40px;
  align-items: center;
  gap: 15px;
  height: 60px;
  padding: 0 10px;
  background-color: var($backspace);
  overflow: hidden;

  & img {
    width: 40px;
  }
  & span {
    width: 100%;
    overflow: hidden;
  }

  &-transition {
    &-enter-active, &-leave-active {
      transition: .3s;
      overflow: hidden;
    }
    &-leave-to, &-enter-from {
      max-height: 0;
    }
    &-leave-from, &-enter-to {
      max-height: 60px;
    }
  }
}
</style>
