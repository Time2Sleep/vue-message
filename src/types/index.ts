import type { Ref } from 'vue';

type MessageType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: MessageType;
  content: string;
  duration: number;
}

export interface RawNotification {
  type: MessageType;
  content: string;
  duration?: number;
}

export interface MessageOptions {
  duration?: number;
}

export interface MessageApi {
  show: (content: string, options?: MessageOptions) => string;
  success: (content: string, options?: MessageOptions) => string;
  error: (content: string, options?: MessageOptions) => string;
  warning: (content: string, options?: MessageOptions) => string;
  info: (content: string, options?: MessageOptions) => string;

  close(id: string): void;
  destroy: () => void;
}

export interface NotificationManager {
  readonly notifications: Readonly<Ref<readonly Notification[]>>;

  add: (notification: RawNotification) => string;
  remove: (id: string) => void;
  destroy: () => void;
}
