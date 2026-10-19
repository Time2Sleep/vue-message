<script setup lang="ts">
import MessageContainer from './components/MessageContainer.vue';
import { notificationManager } from './core/notificationManager';
</script>

<template>
  <MessageContainer />

  <button @click="notificationManager.add({ content: 'test', type: 'error' })">add</button>
</template>
