<script setup lang="ts">
import * as VKID from "@vkid/sdk";
import MessageFrame from "~/components/ui/messageFrame.vue";

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
        vk: {
          token: vkPayload.token,
          uuid: vkPayload.uuid
        },
        device: useDeviceMeta()
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

    <message-frame v-else-if="isError">
      <template v-slot:title>Ошибка входа</template>
      <template v-slot:description>Повторите попытку</template>
      <template v-slot:actions>
        <ui-button
            icon="Reload"
            @click="isFetch = false"
        >
          Обновить
        </ui-button>
      </template>
    </message-frame>
  </div>
</template>

<style lang="scss" scoped>
@import "@colors";

.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
