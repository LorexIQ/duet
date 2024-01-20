<script setup lang="ts">
import type {UseSwitch} from "~/composables/useSwitch";

interface Props {
  modelValue: UseSwitch;
}

const props = defineProps<Props>();
const boxRef = ref<HTMLDivElement>();
const boxHeight = ref(1000);

function closeModal() {
  props.modelValue.hide();
}

onMounted(() => boxHeight.value = boxRef.value?.clientHeight!);
onUpdated(() => boxHeight.value = boxRef.value?.clientHeight!);
</script>

<template>
  <div
      class="popup-modal"
      :class="{ 'popup-modal--opened': modelValue.status.value }"
      :style="`--box-height: ${boxHeight}px;`"
  >
    <div
        class="popup-modal__background"
        @click="closeModal"
    />
    <div
        class="popup-modal__box"
        ref="boxRef"
    >
      <slot/>
    </div>
  </div>
  <div class="popup-modal">

  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.popup-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  pointer-events: none;

  &__background {
    width: 100%;
    height: 100%;
    background: var($blur);
    opacity: 0;
  }
  &__box {
    position: absolute;
    bottom: calc(-1 * var(--box-height));
    width: 100%;
    max-width: min(600px, 100%);
    height: max-content;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    background: var($backspace);
    pointer-events: all;
  }

  & > div {
    transition: .3s;
  }

  &--opened {
    pointer-events: all;

    & .popup-modal {
      &__background {
        opacity: 1;
      }
      &__box {
        bottom: 0;
      }
    }
  }
}
</style>
