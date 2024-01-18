<script setup lang="ts">
const router = useRouter();
const auth = useLocalAuth();
</script>

<template>
  <div class="access-denied-page">
    <span>Доступ к ресурсу запрещён!</span>
    <span>Обратитесь к администратору</span>
    <ui-button
        icon="Reload"
        @click="router.go()"
    >
      Обновить
    </ui-button>
    <ui-button
        icon="Exit"
        @click="auth.signOut()"
    >
      Выйти
    </ui-button>
  </div>
</template>

<style scoped lang="scss">
.access-denied-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > * {
    &:first-child {
      font-size: 22px;
      font-weight: 600;
    }
    &:nth-child(2) {
      font-size: 12px;
      padding-bottom: 15px;
    }
    &:nth-child(3) {
      margin-bottom: 5px;
    }
  }
}
</style>
