<script setup lang="ts">
import type {UISelectListElement} from "~/components/ui/select.vue";

const { $themes } = useNuxtApp();
const createModal = useSwitch({ defaultStatus: false });

const localAuth = useLocalAuth();

const selectedEl = ref<UISelectListElement>();
const list: UISelectListElement[] = [
  {
    id: 0,
    title: 'Строка 1'
  },
  {
    id: 1,
    title: 'Строка 2'
  },
  {
    id: 2,
    title: 'Строка 3'
  }
];

function testFetch() {
  useAPIFetch('GET', 'users/me', {}, { loader: true })
}
</script>

<template>
  <div>
    <ui-button decor="inverted" @click="$themes.selectTheme('light')">light</ui-button>
    <ui-button @click="$themes.selectTheme('dark')">Important</ui-button>
    <ui-button @click="testFetch">TEST FETCH</ui-button>
<!--    <ui-input id="123" icon="Magnifier" placeholder="Поиск"/>-->

    <ui-button @click="localAuth.signOut()">ВЫЙТИ</ui-button>

    <ui-modal v-model="createModal">

    </ui-modal>

    {{selectedEl}}
    <ui-select :list="list" v-model="selectedEl"/>
  </div>
</template>
