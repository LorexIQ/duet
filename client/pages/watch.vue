<script setup lang="ts">
const testSwitch = useSwitch();
</script>

<template>
  <div class="watch-page">
    <ui-button @click="testSwitch.show()">Show</ui-button>
    <ui-button @click="testSwitch.hide()">Hide</ui-button>
    <system-popup-modal v-model="testSwitch">123</system-popup-modal>
  </div>
</template>

<style scoped lang="scss">

</style>
