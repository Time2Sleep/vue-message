# Simple Global Message Library

A lightweight notification library for displaying global popup messages using a clean, declarative API like `message.info()`, `message.success()`, and `message.error()`.

## ✨ Features

- 🚀 Familiar and straightforward API: `message.info()`, `message.success()`, `message.error()`, `message.warning()`.
- 📦 Minimal bundle size with zero heavy dependencies.
- 🎨 Out-of-the-box clean and modern aesthetic.
- ⏳ Automatic dismissal after a specified duration.

## 📦 Installation

Install the library using your preferred package manager:

```bash
npm install vue-message-popup
# or
yarn add vue-message-popup
# or
pnpm add vue-message-popup
```

## 🚀 Usage

### 1. Import Styles

Import the library's CSS file at your application's entry point (e.g., `main.js` or `app.js`):

```javascript
import "vue-message-popup/dist/styles.css";
```

### 2. Method Invocations

Import the `message` object and call the methods directly anywhere in your code:

```javascript
import message from "vue-message-popup";

// Basic info message
message.info("This is a normal information message.");

// Success message
message.success("Data saved successfully!");

// Error message
message.error("An error occurred while loading data.");

// Warning message
message.warning("Please fill in all required fields.");
```

### ⚙️ Customization (Options)

You can pass a custom duration (in seconds) or a configuration object with a close callback:

```javascript
// Display an error message for 5 seconds
message.error("Session expired", 5);

// Using a config object with an onClose callback
message.success("Action completed!", {
  duration: 3,
  onClose: () => {
    console.log("The message panel has disappeared.");
  },
});
```

## 🛠 API Methods

| Method                                            | Description        | Arguments                                                  |
| :------------------------------------------------ | :----------------- | :--------------------------------------------------------- |
| `message.info(content, [duration], [onClose])`    | Information pop-up | `content: string`, `duration: number`, `onClose: function` |
| `message.success(content, [duration], [onClose])` | Success pop-up     | `content: string`, `duration: number`, `onClose: function` |
| `message.error(content, [duration], [onClose])`   | Error pop-up       | `content: string`, `duration: number`, `onClose: function` |
| `message.warning(content, [duration], [onClose])` | Warning pop-up     | `content: string`, `duration: number`, `onClose: function` |

## 📄 License

MIT License
