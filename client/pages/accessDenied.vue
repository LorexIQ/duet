<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const auth = useLocalAuth();

const message = route.query.message ?? 'Доступ к ресурсу запрещён!';
</script>

<template>
  <ui-message-frame>
    <template v-slot:title>{{ message }}</template>
    <template v-slot:description>Обратитесь к администратору</template>
    <template v-slot:actions>
      <ui-button
          icon="Reload"
          @click="router.go(0)"
      >
        Обновить
      </ui-button>
      <ui-button
          v-if="message"
          icon="Back"
          @click="router.go(-1)"
      >
        Назад
      </ui-button>
      <ui-button
          v-else
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
