<script setup lang="ts">
</script>

<template>
  <div class="vk-button">
    <ui-icon
        icon="VK"
        size="30px"
    />
    <slot>Войти</slot>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.vk-button {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  padding: 4px 24px;
  border-radius: 6px;
  background: var($vk-background);
  color: var($vk-color);
  cursor: pointer;
  user-select: none;
  transition: .3s;

  &:hover {
    opacity: .8;
  }
  &:active {
    transform: scale(.95);
  }
}
</style>
