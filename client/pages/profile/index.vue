<script lang="ts" setup>
const currentUser = useMeAuth();
</script>

<template>
  <frame-profile :id="currentUser.id"/>
</template>
