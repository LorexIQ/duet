<script setup lang="ts">
interface Props {
  imgSrc: string;
}

defineProps<Props>();
</script>

<template>
  <div class="profile-button">
    <img :src="imgSrc" alt="profile">
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.profile-button {
  height: 46px;
  aspect-ratio: 1;
  padding: 3px;
  border-radius: 15px;
  background: var($textColor3);

  & img {
    height: 100%;
    border-radius: 12px;
  }
}
</style>
