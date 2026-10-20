import type { MessageApi, MessageOptions } from '../types';
import { notificationManager } from './notificationManager';

export const message: MessageApi = {
  show: (content: string, options?: MessageOptions): string => {
    return notificationManager.add({
      content,
      type: 'default',
      duration: options?.duration,
    });
  },

  error: (content: string, options?: MessageOptions): string => {
    return notificationManager.add({
      content,
      type: 'error',
      duration: options?.duration,
    });
  },

  success: (content: string, options?: MessageOptions): string => {
    return notificationManager.add({
      content,
      type: 'success',
      duration: options?.duration,
    });
  },

  info: (content: string, options?: MessageOptions): string => {
    return notificationManager.add({
      content,
      type: 'info',
      duration: options?.duration,
    });
  },

  warning: (content: string, options?: MessageOptions): string => {
    return notificationManager.add({
      content,
      type: 'warning',
      duration: options?.duration,
    });
  },

  loading: (content: string, options?: MessageOptions): string => {
    return notificationManager.add({
      content,
      type: 'loading',
      duration: options?.duration,
    });
  },

  close: (id: string) => {
    notificationManager.remove(id);
  },

  destroy: notificationManager.destroy,
};
