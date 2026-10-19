<script setup lang="ts">
import { notificationManager } from '../core/notificationManager';

const { notifications } = notificationManager;
</script>

<template>
  <Teleport to="body">
    <TransitionGroup name="list" tag="div" class="vue-popup-message_container">
      <div
        class="message-item"
        v-for="notification in notifications"
        :key="notification.id"
        :role="notification.type === 'error' ? 'alert' : 'status'"
      >
        {{ notification.content }}
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.vue-popup-message_container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
}
</style>
