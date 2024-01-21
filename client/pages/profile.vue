<script setup lang="ts">
const currentUser = useMeAuth();
const contentRef = useState<HTMLDivElement>('contentRef');

const maxScrollTransform = 200;
const scrollTransformPercent = ref(0);
const scrollTransformPercentInverted = computed(() => Math.abs(100 - scrollTransformPercent.value));

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
      class="profile-page"
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
    <div class="profile-page__img">
      <img :src="currentUser.photo" alt="userImg">
    </div>
    <div class="profile-page__name">
      <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
      <span>@{{ currentUser.username }}</span>
    </div>
    <div class="profile-page__info info-block">
      <h3>ИНФОРМАЦИЯ</h3>
      <div class="profile-page__info__content">
        <ui-info-pin
            icon="ID"
            color="#2793c9"
        >
          <template v-slot:value>{{ currentUser.id }}</template>
          <template v-slot:title>ID Пользователя</template>
        </ui-info-pin>
        <ui-info-pin
            icon="Access"
            :color="currentUser.access ? '#47b90f' : '#e11d48'"
        >
          <template v-slot:value>{{ currentUser.access ? 'Имеется' : 'Отсутствует' }}</template>
          <template v-slot:title>Доступ к контенту</template>
        </ui-info-pin>
        <ui-info-pin
            icon="User"
            color="#f4a90a"
        >
          <template v-slot:value>{{ currentUser.role === 'ADMIN' ? 'Админ' : 'Пользователь' }}</template>
          <template v-slot:title>Роль</template>
        </ui-info-pin>
        <ui-info-pin
            icon="Birthday"
            color="#be35cd"
        >
          <template v-slot:value>{{ currentUser.birthday }}</template>
          <template v-slot:title>День рождения</template>
        </ui-info-pin>
      </div>
    </div>
    <div class="profile-page__apps info-block">
      <h3>о них</h3>
      <div></div>
    </div>
    <div class="profile-page__content">

    </div>
  </div>
  <ui-log>
    {{ scrollTransformPercent}}
    {{ between(.4, scrollTransformPercent, 1) }}
  </ui-log>
</template>

<style scoped lang="scss">
@import "@colors";

.info-block {
  position: relative;

  & > h3 {
    position: sticky;
    z-index: 0;
    top: 100px;
    color: var($textColor1);
  }
}

.profile-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  &__info {
    margin-top: 330px;
  }
  &__content {
    height: 2000px;
    width: 100%;
  }
}
</style>
