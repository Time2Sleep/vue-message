# vue-message-popup

A lightweight notification library for Vue 3 with a simple global API for displaying popup messages.

```ts
import { message } from 'vue-message-popup';

message.success('Data saved successfully!');
```

## Features

- **Simple API** — display notifications anywhere in your application.
- **Multiple notifications** — display several messages simultaneously.
- **Automatic dismissal** — configurable duration for each notification.
- **Manual control** — close individual notifications or dismiss all at once.
- **Automatic styling** — styles are injected automatically; no separate CSS import is required.
- **TypeScript support** — type definitions included.
- **Vue 3** — designed for Vue 3 applications.

## Installation

```bash
npm install vue-message-popup
```

Vue 3 is a peer dependency and must be available in your application.

## Quick start

Register the plugin once when creating your Vue application:

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { messagePlugin } from 'vue-message-popup';

const app = createApp(App);

app.use(messagePlugin);
app.mount('#app');
```

The plugin mounts the notification renderer automatically. You do not need to add a notification component to your application template or import a CSS file.

## Usage

Import `message` wherever you need to display a notification:

```ts
import { message } from 'vue-message-popup';

message.show('Something happened.');
message.info('Synchronization started.');
message.success('Data saved successfully!');
message.warning('Please check your input.');
message.error('Failed to save data.');
message.loading('Loading...');
```

Each method returns a unique notification ID:

```ts
const id = message.success('Profile updated!');
```

### Custom duration

Pass an options object to customize how long a notification remains visible. The duration is specified in milliseconds.

```ts
// Display for 5 seconds
message.success('Changes saved!', {
  duration: 5000,
});

// Keep visible until manually closed
const id = message.info('Waiting for confirmation.', {
  duration: 0,
});
```

The default duration is **3000 milliseconds**. Setting `duration` to `0` disables automatic dismissal.

### Close notifications

Close a specific notification using its ID:

```ts
const id = message.info('Uploading...');

message.close(id);
```

Dismiss all notifications:

```ts
message.destroy();
```

`message.destroy()` clears the active notifications. The notification system remains usable afterward.

## API reference

| Method                               | Description                            | Returns  |
| ------------------------------------ | -------------------------------------- | -------- |
| `message.show(content, options?)`    | Displays a default notification        | `string` |
| `message.info(content, options?)`    | Displays an informational notification | `string` |
| `message.success(content, options?)` | Displays a success notification        | `string` |
| `message.warning(content, options?)` | Displays a warning notification        | `string` |
| `message.error(content, options?)`   | Displays an error notification         | `string` |
| `message.loading(content, options?)` | Displays a loading notification        | `string` |
| `message.close(id)`                  | Closes a specific notification         | `void`   |
| `message.destroy()`                  | Closes all active notifications        | `void`   |

### Options

```ts
interface MessageOptions {
  duration?: number;
}
```

| Option     | Type     | Default | Description                                                               |
| ---------- | -------- | ------- | ------------------------------------------------------------------------- |
| `duration` | `number` | `3000`  | Display duration in milliseconds. Use `0` to disable automatic dismissal. |

Negative and non-finite duration values are rejected with a `RangeError`.

## License

[MIT](LICENSE)
