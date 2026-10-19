import { createApp, nextTick } from 'vue';
import { afterEach, describe, expect, test } from 'vitest';
import { messagePlugin, unmountMessageRenderer } from './messagePlugin';
import { notificationManager } from '../core/notificationManager';

const createTestApp = () =>
  createApp({
    template: '<div>Test app</div>',
  });

describe('Message Plugin', () => {
  test('Creates renderer host on install', () => {
    const app = createTestApp();

    app.use(messagePlugin);

    expect(document.querySelector('[data-message-host]')).not.toBeNull();
  });

  test('Renders notifications after plugin installation', async () => {
    const app = createTestApp();

    app.use(messagePlugin);

    notificationManager.add({
      content: 'Hello from plugin',
      type: 'success',
      duration: 0,
    });

    await nextTick();

    expect(document.body.textContent).toContain('Hello from plugin');
  });

  test('Does not create multiple renderers', () => {
    const app = createTestApp();

    app.use(messagePlugin);

    const secondApp = createApp({
      template: '<div>Second app</div>',
    });

    secondApp.use(messagePlugin);

    expect(document.querySelectorAll('[data-message-host]')).toHaveLength(1);
  });

  test('Unmount removes renderer host', () => {
    const app = createTestApp();

    app.use(messagePlugin);

    expect(document.querySelector('[data-message-host]')).not.toBeNull();

    unmountMessageRenderer();

    expect(document.querySelector('[data-message-host]')).toBeNull();
  });

  test('Unmount can be called multiple times', () => {
    const app = createTestApp();

    app.use(messagePlugin);

    expect(() => {
      unmountMessageRenderer();
      unmountMessageRenderer();
    }).not.toThrow();

    expect(document.querySelector('[data-message-host]')).toBeNull();
  });

  test('Can install plugin again after unmount', () => {
    const firstApp = createTestApp();

    firstApp.use(messagePlugin);

    unmountMessageRenderer();

    const secondApp = createTestApp();

    secondApp.use(messagePlugin);

    expect(document.querySelectorAll('[data-message-host]')).toHaveLength(1);
  });

  test('Does not create multiple renderers', () => {
    const firstApp = createTestApp();
    const secondApp = createTestApp();

    firstApp.use(messagePlugin);
    secondApp.use(messagePlugin);

    expect(document.querySelectorAll('[data-message-host]')).toHaveLength(1);
  });

  afterEach(() => {
    unmountMessageRenderer();
    notificationManager.destroy();
    document.body.innerHTML = '';
  });
});
