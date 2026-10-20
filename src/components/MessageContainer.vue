<script setup lang="ts">
import { notificationManager } from '../core/notificationManager';
import MessageItem from './MessageItem.vue';

const { notifications } = notificationManager;
</script>

<template>
  <Teleport to="body">
    <TransitionGroup name="list" tag="div" class="vue-popup-message_container">
      <MessageItem v-for="notification in notifications" :key="notification.id" :notification="notification">
        {{ notification.content }}
      </MessageItem>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.vue-popup-message_container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
