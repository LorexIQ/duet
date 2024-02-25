<template>
  <div class="message-frame">
    <span><slot name="title"/></span>
    <span><slot name="description"/></span>
    <div class="message-frame__actions"><slot name="actions"/></div>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.message-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var($background);

  & > span {
    color: var($textColor3);
    text-align: center;

    &:first-child {
      font-size: 22px;
      font-weight: 600;
    }
    &:nth-child(2) {
      font-size: 12px;
      padding-bottom: 15px;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
}
</style>
