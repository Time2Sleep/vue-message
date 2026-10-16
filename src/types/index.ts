import type { Ref } from "vue";

type MessageType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: MessageType;
  content: string;
  options: MessageOptions;
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
  show: (content: string, options?: MessageOptions) => void;
  success: (content: string, options?: MessageOptions) => void;
  error: (content: string, options?: MessageOptions) => void;
  warning: (content: string, options?: MessageOptions) => void;
  info: (content: string, options?: MessageOptions) => void;
  destroy: () => void;
}

export interface NotificationManager {
  readonly notifications: Readonly<Ref<readonly Notification[]>>;

  add: (notification: RawNotification) => string;
  remove: (id: string) => void;
  destroy: () => void;
}
