import { describe, expect, test, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MessageContainer from './MessageContainer.vue';
import { notificationManager } from '../core/notificationManager';
import { nextTick } from 'vue';

describe('Message Container', () => {
  test('Displays message', async () => {
    mount(MessageContainer);

    notificationManager.add({ content: 'hello world', type: 'error' });

    await nextTick();

    expect(document.body.textContent).toContain('hello world');
  });

  test('Displays multiple messages', async () => {
    mount(MessageContainer);

    notificationManager.add({ content: 'hello world', type: 'error' });
    notificationManager.add({ content: 'second message', type: 'info' });

    await nextTick();

    expect(document.body.textContent).toContain('hello world');
    expect(document.body.textContent).toContain('second message');
    expect(document.body.querySelectorAll('.vue-popup-message_message-item')).toHaveLength(2);
    expect(document.body.querySelector('.vue-popup-message_message-item[role="alert"]')?.textContent).toContain(
      'hello world',
    );
    expect(document.body.querySelector('.vue-popup-message_message-item[role="status"]')?.textContent).toContain(
      'second message',
    );
  });

  test('Deletes expired message', async () => {
    vi.useFakeTimers();

    mount(MessageContainer);

    notificationManager.add({ content: 'hello world', type: 'error', duration: 1000 });
    notificationManager.add({ content: 'second message', type: 'info', duration: 5000 });

    await nextTick();

    expect(document.body.textContent).toContain('hello world');
    expect(document.body.textContent).toContain('second message');

    vi.advanceTimersByTime(2000);
    await nextTick();

    expect(document.body.textContent).not.toContain('hello world');
    expect(document.body.textContent).toContain('second message');
    expect(document.body.querySelectorAll('.vue-popup-message_message-item')).toHaveLength(1);
  });

  test('Unmounting the container does not clear notifications', async () => {
    const container = mount(MessageContainer);

    notificationManager.add({ content: 'hello world', type: 'error' });
    notificationManager.add({ content: 'second message', type: 'info' });

    await nextTick();

    container.unmount();

    expect(notificationManager.notifications.value).toHaveLength(2);
  });

  test('Unmounting the container does not clear timers', async () => {
    vi.useFakeTimers();

    const container = mount(MessageContainer);

    notificationManager.add({ content: 'hello world', type: 'error' });

    await nextTick();

    container.unmount();

    expect(notificationManager.notifications.value).toHaveLength(1);

    vi.advanceTimersByTime(3000);

    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  afterEach(() => {
    notificationManager.destroy();
    vi.useRealTimers();
    document.body.innerHTML = '';
  });
});
