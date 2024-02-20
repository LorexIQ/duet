<script setup lang="ts">

</script>

<template>
  <div class="admin-page">
    <h2>Админ панель</h2>
    <div class="admin-page__content">
      <system-buttons-admin icon="User" to="/admin/users">Позьлователи</system-buttons-admin>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.admin-page {
  & h2 {
    padding: 10px;
    border-bottom: 2px solid var($border);
    box-shadow: 0 0 10px var($shadow);
    color: var($textColor3);
  }

  &__content {
    padding: 10px;
  }
}
</style>
