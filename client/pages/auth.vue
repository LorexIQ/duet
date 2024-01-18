<script setup lang="ts">
import * as VKID from "@vkid/sdk";

const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig().public;

VKID.Config.set({
  app: +runtimeConfig.vkAppId,
  redirectUrl: location.origin + '/auth'
});

const isFetch = ref(false);
const isError = ref(false);

checkPageType(route.query.payload as string);

function checkPageType(payload: string) {
  if (!payload) return false;

  try {
    const vkPayload = JSON.parse(payload);
    isFetch.value = true;

    useAPIFetch('POST', 'auth/vkSignIn', {
      body: {
        token: vkPayload.token,
        uuid: vkPayload.uuid
      }
    }, { loader: true })
        .then(res => {
          router.push({ path: '/auth', query: { ...res } });
        })
        .catch(e => isError.value = true);
  } catch (e) {
    isFetch.value = false;
    return false;
  }
}

watch(isFetch, value => {
  if (!value) isError.value = false;
});

function signInVk() {
  VKID.Auth.login();
}

definePageMeta({
  localAuth: {
    unauthorizedOnly: true
  }
})
</script>

<template>
  <div class="auth-page">
    <system-buttons-vk
        @click="signInVk"
        v-if="!isFetch"
    >
      Войти через ВК
    </system-buttons-vk>

    <div
        class="auth-page__error"
        v-else-if="isError"
    >
      <span>Ошибка входа</span>
      <span>Повторите попытку</span>
      <ui-button
          icon="Reload"
          @click="isFetch = false"
      >
        Обновить
      </ui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@colors";

.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var($textColor3);

    & > span {
      &:first-child {
        font-size: 22px;
        font-weight: 600;
      }
      &:nth-child(2) {
        font-size: 12px;
        padding-bottom: 15px;
      }
    }
  }
}
</style>
