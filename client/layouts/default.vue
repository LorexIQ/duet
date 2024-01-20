<script setup lang="ts">
const fetchStorage = useAPIFetchStore();
const globalFetchLoader = useSwitch({ minSwitchStatusDelay: 500 });

watch(fetchStorage.isLoader, value => {
  if (value) globalFetchLoader.show();
  else globalFetchLoader.hide();
})
</script>

<template>
  <div class="default-layout">
    <system-navbar/>
    <div class="default-layout__header">
      <system-logo/>
    </div>
    <div class="default-layout__content">
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
  max-width: min(600px, 100%);
  height: 100%;
  margin: 0 auto;
  padding: 0 12px 12px 12px;
  background: var($background);
  transition: .3s;

  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    & > .profile-button {
      position: absolute;
      top: 17px;
      right: 0;
    }
  }
  &__content {
    width: 100%;
    height: 100%;
  }

  & .logo {
    height: 80px;
  }
}
</style>
