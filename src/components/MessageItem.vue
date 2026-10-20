<script setup lang="ts">
import { computed } from 'vue';
import { type Notification } from '../types/index';
import SuccessIcon from './icons/SuccessIcon.vue';
import ErrorIcon from './icons/ErrorIcon.vue';
import WarningIcon from './icons/WarningIcon.vue';
import InfoIcon from './icons/InfoIcon.vue';
import LoadingIcon from './icons/LoadingIcon.vue';

const props = defineProps<{
  notification: Notification;
}>();

const icon = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return SuccessIcon;
    case 'error':
      return ErrorIcon;
    case 'warning':
      return WarningIcon;
    case 'info':
      return InfoIcon;
    case 'loading':
      return LoadingIcon;
    default:
      return null;
  }
});
</script>

<template>
  <div class="vue-popup-message_message-item" :role="notification.type === 'error' ? 'alert' : 'status'">
    <component v-if="icon" :is="icon" />

    <div>{{ notification.content }}</div>
  </div>
</template>

<style scoped>
.vue-popup-message_message-item {
  display: flex;
  gap: 8px;
  align-items: center;
  width: fit-content;
  padding: 9px 12px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: all;
  margin-bottom: 6px;
}
</style>
