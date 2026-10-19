import { createApp, type App, type Plugin } from 'vue';
import MessageContainer from '../components/MessageContainer.vue';

let messageApp: App | null = null;
let host: HTMLElement | null = null;

export const messagePlugin: Plugin = {
  install: () => {
    if (messageApp) return;

    host = document.createElement('div');
    host.dataset.messageHost = 'true';

    document.body.appendChild(host);

    messageApp = createApp(MessageContainer);

    messageApp.mount(host);
  },
};

export function unmountMessageRenderer() {
  messageApp?.unmount();
  host?.remove();

  host = null;
  messageApp = null;
}
