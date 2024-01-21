<script setup lang="ts">
interface Props {
  alwaysOn?: boolean;
}

const props = defineProps<Props>();
const mode = useRuntimeConfig().public.mode;
const isVisible = ref(false);

document.onkeydown = function (el) {
  if (el.code === 'ControlLeft') isVisible.value = true;
}
document.onkeyup = function (el) {
  if (el.code === 'ControlLeft') isVisible.value = false;
}
</script>

<template>
  <div
      class="ui-log"
      v-if="mode === 'DEVELOPMENT' || alwaysOn"
  >
    <div class="ui-log__pin">
      Hold
      <ui-icon
          icon="KeyCtrl"
          size="26px"
      />
      to open log
    </div>
    <div
        class="ui-log__data"
        v-if="isVisible"
    >
      <div class="ui-log__data__frame">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.ui-log {
  &__pin {
    position: fixed;
    right: 8px;
    bottom: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
    max-height: 35px;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: var($background);
    box-shadow: 0 5px 10px var($border);
    user-select: none;
  }
  &__data {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var($blur);

    &__frame {
      min-width: min(300px, 100%);
      width: min-content;
      min-height: min(200px, 100%);
      height: min-content;
      padding: 8px;
      border-radius: 8px;
      background-color: var($background);
    }
  }
}
</style>
