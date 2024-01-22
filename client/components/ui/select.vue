<script setup lang="ts" generic="R extends boolean, T extends (R extends true ? any : UISelectListElement)">
import PopupModal from "~/components/system/popupModal.vue";

export interface UISelectListElement {
  value: any;
  title: string;
}

interface Props {
  list: UISelectListElement[];
  title?: string;
  returnValue?: R;
  modelValue: T;
}
interface Emits {
  (e: 'update:modelValue', v: UISelectListElement): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedEl = ref(calcSelectedEl(props.modelValue));
const listSwitch = useSwitch();

watch(() => props.modelValue, value => selectedEl.value = calcSelectedEl(value));

function calcSelectedEl(value: T): UISelectListElement {
  return props.returnValue ? props.list.find(el => el.value === value)! : value;
}
function selectElement(element: UISelectListElement): void {
  emit('update:modelValue', props.returnValue ? element.value : element);
  listSwitch.hide();
}
</script>

<template>
  <div class="ui-select">
    <div
        class="ui-select__header"
        @click="listSwitch.show()"
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
          <ui-icon :icon="listSwitch.status.value ? 'ArrowUp' : 'ArrowDown'" size="16"/>
        </div>
      </div>
    </div>
    <popup-modal v-model="listSwitch">
      <div
          class="ui-select__list"
          @click.stop
      >
        <div
            class="ui-select__list__element"
            v-for="element in list"
            :key="element.value"
            @click="selectElement(element)"
        >
          {{ element.title }}
        </div>
      </div>
    </popup-modal>
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
      padding: 6px 30px 6px 10px;
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
  &__list {
    width: 100%;
    border-radius: 10px;
    border: 1px solid var($border);
    background: var($background);
    overflow: hidden;

    &__element {
      padding: 6px 10px;
      color: var($textColor3);
      cursor: pointer;
      transition: .3s;

      &:not(&:last-child) {
        border-bottom: 1px solid var($border);
      }

      &:hover {
        background: var($backgroundHover);
      }
    }
  }
}
</style>
