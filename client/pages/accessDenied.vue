<script setup lang="ts">
const router = useRouter();
const auth = useLocalAuth();
</script>

<template>
  <ui-message-frame>
    <template v-slot:title>Доступ к ресурсу запрещён!</template>
    <template v-slot:description>Обратитесь к администратору</template>
    <template v-slot:actions>
      <ui-button
          icon="Reload"
          @click="router.go(0)"
      >
        Обновить
      </ui-button>
      <ui-button
          icon="Exit"
          @click="auth.signOut()"
      >
        Выйти
      </ui-button>
    </template>
  </ui-message-frame>
</template>

<style scoped lang="scss">
</style>
