<script setup lang="ts">
import type {IconsType} from "~/app/icons";

interface Props {
  icon: IconsType;
  color: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="ui-info-pin">
    <div class="ui-info-pin__icon">
      <ui-icon
          size="22px"
          :icon="icon"
          :style="`color: ${color}`"
      />
    </div>
    <div class="ui-info-pin__value">
      <slot name="value">Value</slot>
    </div>
    <div class="ui-info-pin__title">
      <slot name="title">Title</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.ui-info-pin {
  display: grid;
  grid-template-areas: "I V" "I T";
  grid-template-columns: 22px auto;
  gap: 2px 10px;
  padding: 6px 10px;
  border: 1px solid var($border);
  border-radius: 10px;

  &__icon {
    grid-area: I;
    justify-self: center;
  }
  &__value {
    grid-area: V;
    font-size: 20px;
    font-weight: 600;
  }
  &__title {
    grid-area: T;
    color: var($textColor1);
  }
}
</style>
