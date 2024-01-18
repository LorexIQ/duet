<script setup lang="ts">
import type {ButtonStyle, ButtonType} from "./types";
import type {IconsType} from "~/app/icons";

interface Props {
  type?: ButtonType
  icon?: IconsType;
  decor?: ButtonStyle,
  disabled?: boolean
}

defineProps<Props>();
</script>

<template>
  <button
      class="ui-button"
      :class="{[`--${decor}`]: decor, 'disabled': disabled}"
      :type="type ?? 'button'"
  >
    <ui-icon
        v-if="icon"
        :icon="icon"
        size="16px"
    />
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
@import "@colors";

.ui-button {
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: max-content;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var($border);
  color: var($textColor1);
  background: var($accent1);
  cursor: pointer;
  user-select: none;
  transition: .3s;

  &:hover {
    opacity: .8;
  }
  &.disabled {
    pointer-events: none !important;
    user-select: none;
    opacity: .5;
  }
  &__link {
    margin-left: 5px;
  }

  &.--inverted {
    font-weight: 700;
    color: var($textColor2);
    background-color: var($accent2);
  }
}
</style>
