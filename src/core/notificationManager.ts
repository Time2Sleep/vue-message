import { readonly, ref } from 'vue';
import type { NotificationManager, RawNotification, Notification } from '../types';

export const notificationManager: NotificationManager = (() => {
  const notifications = ref<Notification[]>([]);
  let timers: Record<string, ReturnType<typeof setTimeout>> = {};

  const add = (raw: RawNotification) => {
    if (raw.duration != null && (raw.duration < 0 || !Number.isFinite(raw.duration))) {
      throw new RangeError('[vue-message-popup]: Invalid duration value!');
    }

    const id = crypto.randomUUID();
    const duration = raw.duration ?? 3000;

    notifications.value.push({
      id,
      ...raw,
      duration,
    });

    if (raw.duration !== 0) {
      timers[id] = setTimeout(() => remove(id), duration);
    }

    return id;
  };

  const remove = (id: string) => {
    const notificationIndex = notifications.value.findIndex((notification) => notification.id === id);

    if (notificationIndex === -1) return;

    if (timers[id] != null) clearTimeout(timers[id]);

    delete timers[id];
    notifications.value.splice(notificationIndex, 1);
  };

  const destroy = () => {
    notifications.value = [];

    Object.values(timers).forEach((timer) => {
      clearTimeout(timer);
    });

    timers = {};
  };

  return {
    notifications: readonly(notifications),
    add,
    remove,
    destroy,
  };
})();
