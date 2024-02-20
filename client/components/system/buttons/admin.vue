<script setup lang="ts">
import type {IconsType} from "~/app/icons";

interface Props {
  to: string;
  icon: IconsType;
}

defineProps<Props>();
</script>

<template>
  <nuxt-link
      :to="to"
      class="admin-button"
  >
    <ui-icon
        size="36px"
        :icon="icon"
    />
    <span><slot/></span>
  </nuxt-link>
</template>

<style scoped lang="scss">
@import "@colors";

.admin-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid var($border);
  border-radius: 8px;
  background-color: var($background);
  color: var($textColor3);
  cursor: pointer;
  user-select: none;
  transition: .3s;

  &:hover {
    background-color: var($backgroundHover);
  }
  &:active {
    transform: scale(.98);
  }
}
</style>
