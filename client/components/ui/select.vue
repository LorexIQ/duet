<script setup lang="ts">
export interface UISelectListElement {
  id: number;
  title: string;
}

interface Props {
  list: UISelectListElement[];
  title?: string;
  modelValue?: UISelectListElement;
}
interface Emits {
  (e: 'update:modelValue', v: UISelectListElement): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedEl = ref(props.modelValue);
const isListOpened = ref(false);

watch(() => props.modelValue, value => selectedEl.value = value);

function selectElement(element: UISelectListElement): void {
  emit('update:modelValue', element);
  isListOpened.value = false;
}
</script>

<template>
  <div class="ui-select">
    <div
        class="ui-select__header"
        @click="isListOpened = true"
    >
      <div
          class="ui-select__header__title"
          v-if="title"
      >
        {{ title }}
      </div>
      <div class="ui-select__header__box">
        <div class="ui-select__header__box__title">
          <template v-if="selectedEl">{{ selectedEl.title }}</template>
          <template v-else>Не выбрано</template>
        </div>
        <div class="ui-select__header__box__icon">
          <ui-icon :icon="isListOpened ? 'ArrowUp' : 'ArrowDown'" size="16"/>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
          class="ui-select__space"
          v-if="isListOpened"
          @click="isListOpened = false"
      >
        <div
            class="ui-select__space__list"
            @click.stop
        >
          <div
              class="ui-select__space__list__element"
              v-for="element in list"
              :key="element.id"
              @click="selectElement(element)"
          >
            {{ element.title }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.ui-select {
  user-select: none;

  &__header {
    &__title {
      
    }
    &__box {
      position: relative;
      padding: 6px 10px;
      border: 1px solid var($border);
      border-radius: 8px;
      cursor: pointer;

      &__title {
        font-size: 14px;
        color: var($textColor3)
      }
      &__icon {
        position: absolute;
        top: 6px;
        right: 6px;
        color: var($textColor3);
      }
    }
  }
  &__space {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    background: var($blur);

    &__list {
      width: 100%;
      max-width: min(580px, 100%);
      padding: 10px;
      border-radius: 10px;
      background: var($background);

      &__element {
        padding: 6px 10px;
        border: 1px solid var($border);
        border-bottom: 0;
        color: var($textColor3);
        cursor: pointer;
        transition: .3s;

        &:first-child {
          border-radius: 8px 8px 0 0;
        }
        &:last-child {
          border-bottom: 1px solid var($border);
          border-radius: 0 0 8px 8px;
        }
        &:hover {
          background: var($backspace);
        }
      }
    }
  }
}
</style>
