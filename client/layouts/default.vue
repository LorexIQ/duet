<script setup lang="ts">
const {$themes} = useNuxtApp();
const fetchStorage = useAPIFetchStore();
const globalFetchLoader = useSwitch({minSwitchStatusDelay: 500});

const contentRef = useState<HTMLDivElement>('contentRef');
const themeStatusBar = computed(() => $themes.selectedTheme.value === 'light' ? '#ffffff' : '#0f172a');
const themeKeysStatusBar = [
  'theme-color',
  'msapplication-navbutton-color',
  'apple-mobile-web-app-status-bar-style'
];

watch(fetchStorage.isLoader, value => {
  if (value) globalFetchLoader.show();
  else globalFetchLoader.hide();
});

useHead({
  meta: themeKeysStatusBar.map(name => ({
    name,
    content: themeStatusBar
  }))
});
</script>

<template>
  <div class="default-layout">
    <system-navbar/>
    <div class="default-layout__header">
      <system-logo/>
    </div>
    <div
        class="default-layout__content"
        ref="contentRef"
    >
      <slot/>
    </div>
    <ui-loader v-model="globalFetchLoader"/>
  </div>
</template>

<style scoped lang="scss">
@import '@colors';

.default-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: min(600px, 100%);
  height: 100%;
  margin: 0 auto;
  background: var($background);
  transition: .3s;
  overflow: hidden;

  &__header {
    padding: 10px;

    .logo {
      height: 40px;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow: auto;


    &::-webkit-scrollbar {
      width: 4px;

      &-track {
        border-radius: 2px;
        background: var($background);
      }

      &-thumb {
        border-radius: 2px;
        background: var($textColor3);
      }
    }
  }
}
</style>
