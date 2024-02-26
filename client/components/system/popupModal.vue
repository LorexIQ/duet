<script setup lang="ts">
import type {UseSwitch} from "~/composables/useSwitch";

interface Props {
  zIndex?: number;
  optimizeListHidden?: boolean
  modelValue: UseSwitch;
}

const props = withDefaults(defineProps<Props>(), {
  zIndex: 2,
  optimizeListHidden: true
});
const boxRef = ref<HTMLDivElement>();
const boxHeight = ref(1000);
const isListShow = ref(false);
const isAnimation = ref(false);
let closeDelayTimeoutId: NodeJS.Timeout;

watch(props.modelValue.status, value => {
  clearTimeout(closeDelayTimeoutId);
  if (value) {
    isListShow.value = true;
    setTimeout(() => isAnimation.value = true);
  } else {
    isAnimation.value = false
    closeDelayTimeoutId = setTimeout(() => isListShow.value = false, props.modelValue.delay);
  }
});

function closeModal() {
  props.modelValue.hide();
}

onMounted(() => boxHeight.value = boxRef.value?.clientHeight!);
onUpdated(() => boxHeight.value = boxRef.value?.clientHeight!);
</script>

<template>
  <div
      class="popup-modal"
      v-if="optimizeListHidden ? isListShow : true"
      :class="{ 'popup-modal--opened': isAnimation }"
      :style="{
        '--box-height': `${boxHeight}px`,
        '--box-z-index': zIndex
      }"
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--box-z-index);
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
