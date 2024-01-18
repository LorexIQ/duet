<script setup lang="ts">
import type {UseSwitch} from "~/composables/useSwitch";

interface Props {
  modelValue: UseSwitch;
}

const props = defineProps<Props>();
const hook = props.modelValue;
</script>

<template>
  <transition name="fade">
    <div
        class="modal"
        v-if="hook.status.value"
    >
      <system-click-outside
          class="modal__content"
          @trigger="hook.hide"
          :state="hook.status.value"
      >
        <slot/>
      </system-click-outside>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '@colors';

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);

  &__content {
    display: flex;
    flex-direction: column;
    width: min(580px, 100%);
    height: 100%;
    border-radius: 7px;
    background-color: var($background);

    & > * {
      padding: 15px 20px;
    }
    & .l-hr {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
