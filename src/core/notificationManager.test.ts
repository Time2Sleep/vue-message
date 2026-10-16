import { describe, expect, test, afterEach, vi } from 'vitest';
import { notificationManager } from './notificationManager';
import type { RawNotification } from '../types';

const hasNotification = (id: string): boolean =>
  notificationManager.notifications.value.some((notification) => notification.id === id);

describe('Notification Manager', () => {
  test('ID is not empty', () => {
    const id = notificationManager.add({ type: 'error', content: 'test content' });

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  test('Notification is added to list', () => {
    const id = notificationManager.add({ type: 'error', content: 'test content' });

    expect(hasNotification(id)).toBe(true);
  });

  test('Notification has exact settings and default duration', () => {
    const notificationToAdd: RawNotification = { type: 'error', content: 'test content' };
    const id = notificationManager.add(notificationToAdd);

    const found = notificationManager.notifications.value.find((notification) => notification.id === id);

    expect(found?.content).toBe(notificationToAdd.content);
    expect(found?.type).toBe(notificationToAdd.type);
    expect(found?.duration).toBe(3000);
  });

  test('Notification has exact all settings', () => {
    const notificationToAdd: RawNotification = { type: 'error', content: 'test content', duration: 5000 };
    const id = notificationManager.add(notificationToAdd);

    const found = notificationManager.notifications.value.find((notification) => notification.id === id);

    expect(found).toBeDefined();
    expect(found?.content).toBe(notificationToAdd.content);
    expect(found?.type).toBe(notificationToAdd.type);
    expect(found?.duration).toBe(notificationToAdd.duration);
  });

  test('Notifications have different ids', () => {
    const firstId = notificationManager.add({ type: 'error', content: 'test content' });
    const secondId = notificationManager.add({ type: 'error', content: 'test content' });

    expect(firstId).not.toBe(secondId);
  });

  test('Multiple addings', () => {
    const firstId = notificationManager.add({ type: 'error', content: 'test content' });
    const secondId = notificationManager.add({ type: 'error', content: 'test content' });
    const thirdId = notificationManager.add({ type: 'error', content: 'test content' });

    const firstFound = notificationManager.notifications.value.find((notification) => notification.id === firstId);
    const secondFound = notificationManager.notifications.value.find((notification) => notification.id === secondId);
    const thirdFound = notificationManager.notifications.value.find((notification) => notification.id === thirdId);

    expect(notificationManager.notifications.value).toHaveLength(3);
    expect(firstFound).toBeDefined();
    expect(secondFound).toBeDefined();
    expect(thirdFound).toBeDefined();
  });

  test('removes the specified notification', () => {
    const firstId = notificationManager.add({ type: 'error', content: 'test content' });

    notificationManager.remove(firstId);

    expect(hasNotification(firstId)).toBe(false);
    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('preserves other notifications when removing one', () => {
    const firstId = notificationManager.add({ type: 'info', content: 'test content' });
    const secondId = notificationManager.add({ type: 'error', content: 'test content' });

    notificationManager.remove(firstId);

    expect(notificationManager.notifications.value).toHaveLength(1);
    expect(hasNotification(secondId)).toBe(true);
  });

  test('Double remove does nothing', () => {
    const firstId = notificationManager.add({ type: 'info', content: 'test content' });
    const secondId = notificationManager.add({ type: 'error', content: 'test content' });

    notificationManager.remove(firstId);
    notificationManager.remove(firstId);

    expect(notificationManager.notifications.value).toHaveLength(1);
    expect(hasNotification(secondId)).toBe(true);
  });

  test('Remove with nonexistent id does nothing', () => {
    const firstId = notificationManager.add({ type: 'info', content: 'test content' });
    const secondId = notificationManager.add({ type: 'error', content: 'test content' });

    notificationManager.remove('no such id');

    expect(notificationManager.notifications.value).toHaveLength(2);
    expect(hasNotification(firstId)).toBe(true);
    expect(hasNotification(secondId)).toBe(true);
  });

  test('Remove all notifications', () => {
    notificationManager.add({ type: 'error', content: 'test content' });
    notificationManager.add({ type: 'error', content: 'test content' });
    notificationManager.add({ type: 'error', content: 'test content' });

    notificationManager.destroy();

    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('Notification is automatically removed after duration', () => {
    vi.useFakeTimers();

    const firstId = notificationManager.add({ type: 'error', content: 'test content' });

    vi.advanceTimersByTime(2999);

    expect(hasNotification(firstId)).toBe(true);

    vi.advanceTimersByTime(1);

    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('Notification is automatically removed in 5000 ms', () => {
    vi.useFakeTimers();

    const firstId = notificationManager.add({ type: 'error', content: 'test content', duration: 5000 });

    vi.advanceTimersByTime(4999);

    expect(hasNotification(firstId)).toBe(true);

    vi.advanceTimersByTime(1);

    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('Notifications have independent timers', () => {
    vi.useFakeTimers();

    const firstId = notificationManager.add({ type: 'error', content: 'test content' });
    const secondId = notificationManager.add({ type: 'error', content: 'test content', duration: 5000 });

    vi.advanceTimersByTime(2999);

    expect(hasNotification(firstId)).toBe(true);
    expect(hasNotification(secondId)).toBe(true);

    vi.advanceTimersByTime(1);

    expect(hasNotification(firstId)).toBe(false);
    expect(hasNotification(secondId)).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(hasNotification(secondId)).toBe(false);
    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('Manual removal clears notification timer', () => {
    vi.useFakeTimers();

    const id = notificationManager.add({ type: 'error', content: 'test content' });
    expect(vi.getTimerCount()).toBe(1);

    vi.advanceTimersByTime(1000);

    expect(vi.getTimerCount()).toBe(1);

    notificationManager.remove(id);

    expect(vi.getTimerCount()).toBe(0);
    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('Destroy clears all notification timers', () => {
    vi.useFakeTimers();

    notificationManager.add({ type: 'error', content: 'test content', duration: 1000 });
    notificationManager.add({ type: 'error', content: 'test content' });
    notificationManager.add({ type: 'error', content: 'test content', duration: 5000 });

    expect(vi.getTimerCount()).toBe(3);

    notificationManager.destroy();

    expect(vi.getTimerCount()).toBe(0);
    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test('Zero duration disables auto-dismiss', () => {
    vi.useFakeTimers();

    const id = notificationManager.add({ type: 'error', content: 'test content', duration: 0 });

    expect(vi.getTimerCount()).toBe(0);
    expect(hasNotification(id)).toBe(true);

    vi.advanceTimersByTime(10000);

    expect(hasNotification(id)).toBe(true);

    notificationManager.remove(id);

    expect(hasNotification(id)).toBe(false);
    expect(notificationManager.notifications.value).toHaveLength(0);
  });

  test.each([-1, NaN, Infinity, -Infinity])('Invalid duration throws error', (value) => {
    vi.useFakeTimers();

    expect(() => notificationManager.add({ type: 'error', content: 'test content', duration: value })).toThrow(
      RangeError,
    );
    expect(notificationManager.notifications.value).toHaveLength(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  afterEach(() => {
    notificationManager.destroy();
    vi.useRealTimers();
  });
});
