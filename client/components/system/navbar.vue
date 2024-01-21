<script setup lang="ts">
interface PageButton {
  title: string;
  link: string;
}

const router = useRouter();
const auth = useLocalAuth();
const currentUser = useMeAuth();
const stateSwitch = useSwitch();

const pageButtons: PageButton[] = [
  {
    title: 'Просмотр',
    link: '/watch'
  },
  {
    title: 'Готовка',
    link: '/cooking'
  },
];

function openProfile() {
  closeNavbar();
  router.push({ path: '/profile' });
}
function changeModalState() {
  if (stateSwitch.status.value) stateSwitch.hide();
  else stateSwitch.show();
}
function closeNavbar() {
  stateSwitch.hide();
}
function exitFromAccount() {
  closeNavbar();
  setTimeout(() => auth.signOut(), 300);
}
</script>

<template>
  <system-popup-modal
      v-if="auth.meta.value.status === 'authorized'"
      :optimize-list-hidden="false"
      v-model="stateSwitch"
  >
    <div
        class="navbar__opener"
        @click="changeModalState"
    >
      <ui-icon
          :icon="stateSwitch.status.value ? 'MenuClose' : 'MenuOpen'"
          size="28px"
      />
      <div class="navbar__opener__angle navbar__opener__angle--left"/>
      <div class="navbar__opener__angle navbar__opener__angle--right"/>
    </div>
    <div class="navbar__profile background-shadow">
      <div
          class="navbar__profile__info"
          @click="openProfile"
      >
        <system-buttons-profile :img-src="currentUser.photo"/>
        <div class="navbar__profile__info__name">
          <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
          <span>@{{ currentUser.username }}</span>
        </div>
      </div>
      <div
          class="navbar__profile__action"
          @click.stop="exitFromAccount"
      >
        <ui-icon
            icon="Exit"
            size="24px"
        />
      </div>
    </div>
    <div class="navbar__pages background-shadow">
      <nuxt-link
          class="navbar__pages__page"
          exact-active-class="navbar__pages__page--active"
          v-for="page in pageButtons"
          :key="page.link"
          :to="page.link"
          @click="closeNavbar"
      >
        {{ page.title }}
      </nuxt-link>
    </div>
  </system-popup-modal>
</template>

<style scoped lang="scss">
@import "@colors";

.navbar {
  &__opener {
    position: absolute;
    top: -28px;
    left: calc(50% - 50px);
    display: flex;
    justify-content: center;
    width: 100px;
    border-radius: 20% 20% 0 0 / 85% 85% 0 0;
    background: var($backspace);
    box-shadow: 0 -1px 2px -1px var($textColor3);
    color: var($textColor3);
    cursor: pointer;

    &__angle {
      position: absolute;
      bottom: 0;
      width: 6px;
      height: 30%;
      overflow: hidden;

      &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        box-shadow: -5px 0 0 100px var($backspace);
      }

      &--left{
        left: -5.7px;

        &:after {
          border-radius: 0 0 100% 0 / 0 0 100% 0;
        }
      }
      &--right {
        right: -5.7px;

        &:after {
          border-radius: 0 0 0 100% / 0 0 0 100%;
        }
      }
    }
  }
  &__profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12.5px 12.5px;
    background: var($background);
    color: var($textColor3);
    overflow: hidden;

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 30px);
      padding: 5px 0 5px 5px;
      cursor: pointer;

      &__name {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: 100%;

        & > span {
          &:first-child {
            font-weight: 600;
          }
          &:last-child {
            font-size: 12px;
          }
        }
      }
    }
    &__action {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 56px;
      padding: 5px;
      cursor: pointer;
    }

    & > div {
      transition: .3s;

      &:hover {
        background: var($backgroundHover);
      }
    }
  }
  &__pages {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    border-radius: 12.5px 12.5px;
    background: var($background);
    overflow: hidden;

    &__page {
      font-weight: 600;
      position: relative;
      padding: 10px 10px;
      border-bottom: 0;
      color: var($textColor3);
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: .3s;

      &:not(&:last-child):after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 5%;
        width: 90%;
        height: 1px;
        background: var($textColor3);
      }
      &:hover {
        background: var($backgroundHover);
      }

      &--active {
        background: var($textColor3);
        color: var($background);
        pointer-events: none;
      }
    }
  }
}
</style>
