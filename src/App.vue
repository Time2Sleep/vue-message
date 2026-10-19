<script setup lang="ts">
import MessageContainer from './components/MessageContainer.vue';
import { message } from './core/message';
</script>

<template>
  <MessageContainer />

  <button @click="message.show('defaule')">default</button>
  <button @click="message.success('success')">success</button>
  <button @click="message.error('error')">error</button>
  <button @click="message.warning('warning')">warning</button>
  <button @click="message.info('info')">info</button>
  <button @click="message.loading('loading')">loading</button>
</template>
