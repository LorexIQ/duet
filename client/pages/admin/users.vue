<script setup lang="ts">
import type {UserEntity} from "~/api/entities";

const usersList = reactive([] as UserEntity[]);

try {
  Object.assign(usersList, await useAPIFetch('GET', 'users', {}, { loader: true }));
} catch (e: any) {
  console.error(e);
}
</script>

<template>
  <div class="admin-users-page">

  </div>
</template>

<style scoped lang="scss">
.admin-users-page {

}
</style>
