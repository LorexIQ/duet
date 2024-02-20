<script setup lang="ts">
import type {IconsType} from "~/app/icons";
import type {UserEntity} from "~/api/entities";
import type {UISelectListElement} from "~/components/ui/select.vue";

interface PinConfig<T = null> {
  icon: IconsType;
  color: string;
  value: string;
  title: string;
  meta?: T;
}

interface Props {
  id: number;
}

const props = defineProps<Props>();
const router = useRouter();

const contentRef = useState<HTMLDivElement>('contentRef');
const userProfile = reactive({} as UserEntity);
const isError = ref('');

const maxScrollTransform = 200;
const scrollTransformPercent = ref(0);

const accessSelectList: UISelectListElement[] = [
  {
    title: 'Разрешить',
    value: true
  },
  {
    title: 'Запретить',
    value: false
  },
];

const idPinConfig = computed<PinConfig>(() => {
  const id = userProfile.id;
  return {
    icon: 'ID',
    color: '#2793c9',
    value: id.toString(),
    title: 'ID Пользователя'
  };
});
const accessPinConfig = computed<PinConfig>(() => {
  const access = userProfile.access;
  return {
    icon: 'Access',
    color: access ? '#47b90f' : '#e11d48',
    value: access ? 'Имеется' : 'Отсутствует',
    title: 'Доступ к контенту'
  };
});
const rolePinConfig = computed<PinConfig>(() => {
  const role = userProfile.role;
  return {
    icon: 'User',
    color: '#f4a90a',
    value: role === 'ADMIN' ? 'Админ' : 'Пользователь',
    title: 'Роль'
  };
});
const birthdayPinConfig = computed<PinConfig>(() => {
  const birthday = userProfile.birthday;
  return {
    icon: 'Birthday',
    color: '#be35cd',
    value: birthday,
    title: 'День рождения'
  };
});
const genderPinConfig = computed<PinConfig>(() => {
  const gender = userProfile.gender;
  return {
    icon: gender === 'MALE' ? 'GenderMale' : gender === 'FEMALE' ? 'GenderFemale' : 'Gender',
    color: gender === 'MALE' ? '#2793c9' : gender === 'FEMALE' ? '#b951ac' : '#8e9599',
    value: gender === 'MALE' ? 'Мужской' : gender === 'FEMALE' ? 'Женский' : 'Не указан',
    title: 'Гендер'
  };
});
const vkPinConfig = computed<PinConfig<{ id: number }>>(() => {
  const vkId = userProfile.vkId;
  return {
    icon: 'VK',
    color: '#2793c9',
    value: 'Перейти',
    title: 'Профиль VK',
    meta: { id: vkId }
  };
});

try {
  Object.assign(userProfile, await useAPIFetch('GET', 'users/{id}', {
    params: { id: props.id }
  }, {
    loader: true
  }));
} catch (e: any) {
  isError.value = e.data.message[0];
}

watch(() => userProfile.access, value => {
  useAPIFetch('PATCH', 'users/access/{id}', {
    params: {
      id: userProfile.id
    },
    body: {
      access: value
    }
  });
});

function between(mn: number, cr: number, mx: number): number {
  return mn + (mx - mn) / 100 * cr;
}
function scrollList(event: Event) {
  const target = event.target as HTMLDivElement;

  scrollTransformPercent.value = Math.round(target.scrollTop * 100 / maxScrollTransform);
  if (scrollTransformPercent.value > 100) scrollTransformPercent.value = 100;
}

onMounted(() => contentRef.value.addEventListener("scroll", scrollList))
onUnmounted(() => contentRef.value.removeEventListener("scroll", scrollList))
</script>

<template>
  <div
      class="profile-frame"
      v-if="!isError"
      :style="{
        '--scroll-img-top': `${between(70, scrollTransformPercent, 50)}px`,
        '--scroll-img-padding': `${between(10, scrollTransformPercent, 3)}px`,
        '--scroll-img-border': `${between(50, scrollTransformPercent, 33)}px`,
        '--scroll-img-height': `${between(220, scrollTransformPercent, 66)}px`,
        '--scroll-name-font-1': `${between(24, scrollTransformPercent, 14)}px`,
        '--scroll-name-font-2': `${between(14, scrollTransformPercent, 8)}px`,
        '--scroll-name-padding': `${between(10, scrollTransformPercent, 4)}px`,
        '--scroll-name-top': `${between(290, scrollTransformPercent, 116)}px`,
      }"
  >
    <div class="profile-frame__img">
      <img :src="userProfile.photo" alt="userImg">
    </div>
    <div class="profile-frame__name">
      <span>{{ userProfile.firstName }} {{ userProfile.lastName }}</span>
      <span>@{{ userProfile.username }}</span>
    </div>
    <div class="profile-frame__status info-block">
      <h3>СТАТУС</h3>
      <div class="profile-frame__status__content">
        <span v-if="userProfile.status">{{ userProfile.status }}</span>
        <span v-else style="color: var(--textColor1)">Не задан</span>
      </div>
    </div>
    <div class="profile-frame__info info-block">
      <h3>ИНФОРМАЦИЯ</h3>
      <div class="profile-frame__info__content">
        <ui-info-pin
            :icon="idPinConfig.icon"
            :color="idPinConfig.color"
        >
          <template v-slot:value>{{ idPinConfig.value }}</template>
          <template v-slot:title>{{ idPinConfig.title }}</template>
        </ui-info-pin>
        <ui-info-pin
            :icon="accessPinConfig.icon"
            :color="accessPinConfig.color"
        >
          <template v-slot:value>{{ accessPinConfig.value }}</template>
          <template v-slot:title>{{ accessPinConfig.title }}</template>
          <template v-slot:actions>
            <ui-select
                v-if="isAdmin().value && id !== useMeAuth().value.id && userProfile.role !== 'ADMIN'"
                :return-value="true"
                :list="accessSelectList"
                v-model="userProfile.access"
            />
          </template>
        </ui-info-pin>
        <ui-info-pin
            :icon="rolePinConfig.icon"
            :color="rolePinConfig.color"
        >
          <template v-slot:value>{{ rolePinConfig.value }}</template>
          <template v-slot:title>{{ rolePinConfig.title }}</template>
        </ui-info-pin>
        <ui-info-pin
            :icon="birthdayPinConfig.icon"
            :color="birthdayPinConfig.color"
        >
          <template v-slot:value>{{ birthdayPinConfig.value }}</template>
          <template v-slot:title>{{ birthdayPinConfig.title }}</template>
        </ui-info-pin>
        <ui-info-pin
            :icon="genderPinConfig.icon"
            :color="genderPinConfig.color"
        >
          <template v-slot:value>{{ genderPinConfig.value }}</template>
          <template v-slot:title>{{ genderPinConfig.title }}</template>
        </ui-info-pin>
        <ui-info-pin
            :icon="vkPinConfig.icon"
            :color="vkPinConfig.color"
        >
          <template v-slot:value>
            <a
                :href="`https://vk.com/id${vkPinConfig.meta?.id}`"
                style="font-weight: 600"
                target="_blank"
            >
              {{ vkPinConfig.value }}
              <ui-icon
                  icon="Link"
                  size="16px"
              />
            </a>
          </template>
          <template v-slot:title>{{ vkPinConfig.title }}</template>
        </ui-info-pin>
      </div>
    </div>
  </div>
  <message-frame v-else>
    <template v-slot:title>Ошибка загрузки</template>
    <template v-slot:description>{{ isError }}</template>
    <template v-slot:actions>
      <ui-button
          icon="Reload"
          @click="router.go(0)"
      >
        Обновить
      </ui-button>
      <ui-button
          icon="Back"
          @click="router.go(-1)"
      >
        Назад
      </ui-button>
    </template>
  </message-frame>
</template>

<style scoped lang="scss">
@import "@colors";

.info-block {
  position: relative;
  width: 100%;

  & > h3 {
    position: sticky;
    z-index: 0;
    top: 95px;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    color: var($textColor3);
    background: var($background);
    box-shadow: 0 5px 5px var($shadow);
    text-align: center;
  }
  & > div {
    padding: 10px;
  }
}

.profile-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;

  &__img, &__name {
    z-index: 1;
    width: 100%;
    max-width: min(596px, 100%);
  }
  &__img {
    position: fixed;
    top: var(--scroll-img-top);
    display: flex;
    justify-content: center;

    & > img {
      z-index: 1;
      width: var(--scroll-img-height);
      height: var(--scroll-img-height);
      padding: var(--scroll-img-padding);
      border-radius: var(--scroll-img-border);
      background: var($textColor3);
    }

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      z-index: 0;
      width: 100%;
      height: calc(var(--scroll-img-height) - 6px);
      background: var($background);
    }
  }
  &__name {
    position: fixed;
    top: var(--scroll-name-top);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: var(--scroll-name-padding);
    padding-bottom: 10px;
    color: var($textColor3);
    background: var($background);

    & span {
      &:first-child {
        font-size: var(--scroll-name-font-1);
        font-weight: 600;
      }
      &:last-child {
        font-size: var(--scroll-name-font-2);
      }
    }
  }
  &__status {
    margin-top: 330px;

    &__content {
      text-align: center;
      color: var($textColor3);

    }
  }
  &__info {
    &__content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;

      & .ui-select {
        width: 120px;
      }
    }
  }
}
</style>
