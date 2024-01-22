<script setup lang="ts">
const route = useRoute();
const userId = +route.params.id;
</script>

<template>
  <frame-profile :id="userId"/>
</template>
