<script setup lang="ts">
import type {UseSwitch} from "~/composables/useSwitch";

interface Props {
  modelValue: UseSwitch;
}

defineProps<Props>();
</script>

<template>
  <transition name="fade-without-enter">
    <div
        class="ui-loader"
        v-if="modelValue.status.value"
    >
      <system-logo/>
      <system-loader :size="200"/>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import "@colors";

.ui-loader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var($background);

  & .logo {
    position: absolute;
    top: 0;
    height: 80px;
    margin: 0 auto;
  }
}
</style>
