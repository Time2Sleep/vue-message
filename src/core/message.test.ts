import { describe, expect, test, afterEach } from 'vitest';
import { notificationManager } from '../core/notificationManager';
import { message } from '../core/message';
import type { MessageApi } from '../types';

describe('Message API', () => {
  test('Message api creates notification', () => {
    const id = message.show('Test');

    const notification = notificationManager.notifications.value.find((notification) => notification.id === id);

    expect(notification).toBeDefined();
    expect(notification?.content).toBe('Test');
    expect(notification?.type).toBe('default');
    expect(notification?.duration).toBe(3000);
  });

  test.each(['success', 'error', 'warning', 'info', 'loading'])(
    'Message api creates notification with type',
    (type) => {
      const id = message[type as keyof MessageApi](`${type} content`);

      const notification = notificationManager.notifications.value.find((notification) => notification.id === id);

      expect(notification).toBeDefined();
      expect(notification?.content).toBe(`${type} content`);
      expect(notification?.type).toBe(type);
      expect(notification?.duration).toBe(3000);
    },
  );

  test('Returns notification ID', () => {
    const id = message.success('Test');

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  test('Uses custom duration', () => {
    const id = message.success('Test', { duration: 5000 });

    const notification = notificationManager.notifications.value.find((notification) => notification.id === id);

    expect(notification?.duration).toBe(5000);
  });

  test('Preserves zero duration', () => {
    const id = message.success('Test', { duration: 0 });

    const notification = notificationManager.notifications.value.find((notification) => notification.id === id);

    expect(notification?.duration).toBe(0);
  });

  test('Closes notification by ID', () => {
    const firstId = message.success('First');
    const secondId = message.error('Second');

    message.close(firstId);

    const notifications = notificationManager.notifications.value;

    expect(notifications.some(({ id }) => id === firstId)).toBe(false);
    expect(notifications.some(({ id }) => id === secondId)).toBe(true);
  });

  test('Does nothing when closing an unknown ID', () => {
    message.success('Existing');

    expect(() => message.close('unknown-id')).not.toThrow();
    expect(notificationManager.notifications.value).toHaveLength(1);
  });

  test('Destroys all notifications', () => {
    message.success('First');
    message.error('Second');

    message.destroy();

    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test.each([-1, NaN, Infinity, -Infinity])('Throws for invalid duration: %s', (duration) => {
    expect(() => message.success('Test', { duration })).toThrow(RangeError);
    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  afterEach(() => {
    notificationManager.destroy();
  });
});
