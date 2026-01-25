# @mohamedfariz/react-idle-screensaver

A lightweight, TypeScript-first React library for detecting user inactivity and displaying customizable screensaver overlays.

Built for **kiosks, dashboards, TVs, digital signage, and unattended React applications**.  
Compatible with **React 18+** and designed to be **tree-shakable, SSR-safe, and bundler-friendly**.

---

## ✨ Features

- Idle / inactivity detection
- Pluggable screensaver components
- Built-in screensavers included
- React 18+ compatible
- TypeScript-first API with `.d.ts`
- CSS-based styling (no inline styles)
- Tree-shakable and Rollup-friendly
- Safe for kiosk / long-running displays

---

## 🎮 Live Demo

Try out the library in a live CodeSandbox environment:

**[🚀 View Interactive Demo](https://codesandbox.io/p/sandbox/8frqs2)**

Explore all built-in screensavers and customize settings in real-time.

---

## 📦 Installation

### Via Package Manager (Recommended)

```bash
npm install @mohamedfariz/react-idle-screensaver
```

or

```bash
yarn add @mohamedfariz/react-idle-screensaver
```

or

```bash
pnpm add @mohamedfariz/react-idle-screensaver
```

or

```bash
bun add @mohamedfariz/react-idle-screensaver
```

### Via CDN (No Build Tool Required)

You can use the library directly in the browser without a build tool:

#### Using unpkg:

```html
<!-- React and ReactDOM (peer dependencies) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Lucide React (required for BouncingScreensaver) -->
<script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.js"></script>

<!-- React Idle Screensaver -->
<link rel="stylesheet" href="https://unpkg.com/@mohamedfariz/react-idle-screensaver/dist/style.css" />
<script src="https://unpkg.com/@mohamedfariz/react-idle-screensaver/dist/index.umd.js"></script>
```

#### Using jsDelivr:

```html
<!-- React and ReactDOM (peer dependencies) -->
<script crossorigin src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Lucide React (required for BouncingScreensaver) -->
<script src="https://cdn.jsdelivr.net/npm/lucide-react@latest/dist/umd/lucide-react.js"></script>

<!-- React Idle Screensaver -->
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@mohamedfariz/react-idle-screensaver/dist/style.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@mohamedfariz/react-idle-screensaver/dist/index.umd.js"></script>
```

#### CDN Usage Example:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Idle Screensaver - CDN Example</title>

        <!-- CSS -->
        <link rel="stylesheet" href="https://unpkg.com/@mohamedfariz/react-idle-screensaver/dist/style.css" />
    </head>
    <body>
        <div id="root"></div>

        <!-- React -->
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

        <!-- Lucide React (required for BouncingScreensaver) -->
        <script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.js"></script>

        <!-- React Idle Screensaver -->
        <script src="https://unpkg.com/@mohamedfariz/react-idle-screensaver/dist/index.umd.js"></script>

        <script>
            const { ScreensaverManager, MatrixScreensaver } = window.ReactIdleScreensaver;
            const { createElement } = React;
            const { createRoot } = ReactDOM;

            function App() {
                return createElement(
                    ScreensaverManager,
                    { component: MatrixScreensaver, timeout: 5000 },
                    createElement(
                        'div',
                        { style: { height: '100vh', padding: '20px' } },
                        createElement('h1', null, 'My Application'),
                        createElement('p', null, 'Move your mouse to dismiss the screensaver'),
                    ),
                );
            }

            const root = createRoot(document.getElementById('root'));
            root.render(createElement(App));
        </script>
    </body>
</html>
```

**Note:** When using CDN, the library is available as `window.ReactIdleScreensaver` and includes all exports:

- `ScreensaverManager`
- `MatrixScreensaver`
- `BouncingScreensaver`
- `StarfieldScreensaver`
- `ImageSliderScreensaver`
- `useIdleTimer`
- `ScreensaverContext`

---

## 🚀 Quick Start

### 1. Import CSS (Required)

The library requires CSS to be imported in your application:

```tsx
import '@mohamedfariz/react-idle-screensaver/style.css';
```

**Important:** Place this import at the top of your main app file (e.g., `main.tsx`, `App.tsx`, or `index.tsx`).

### 2. Basic Usage

Wrap your application with `ScreensaverManager` and provide a screensaver component:

```tsx
import { ScreensaverManager, MatrixScreensaver } from '@mohamedfariz/react-idle-screensaver';
import '@mohamedfariz/react-idle-screensaver/style.css';

function App() {
    return (
        <ScreensaverManager component={MatrixScreensaver} timeout={5000}>
            <div style={{ height: '100vh' }}>
                <h1>My Application</h1>
                <p>Your content here...</p>
            </div>
        </ScreensaverManager>
    );
}

export default App;
```

The screensaver will automatically activate after 5 seconds (5000ms) of user inactivity.

---

## 📚 Complete Examples

### Example 1: Using Different Built-in Screensavers

```tsx
import {
    ScreensaverManager,
    MatrixScreensaver,
    BouncingScreensaver,
    StarfieldScreensaver,
    ImageSliderScreensaver,
} from '@mohamedfariz/react-idle-screensaver';
import '@mohamedfariz/react-idle-screensaver/style.css';

// Example with Matrix
function AppWithMatrix() {
    return (
        <ScreensaverManager component={MatrixScreensaver} timeout={10000}>
            <YourApp />
        </ScreensaverManager>
    );
}

// Example with Bouncing Badge
function AppWithBouncing() {
    return (
        <ScreensaverManager
            component={BouncingScreensaver}
            componentProps={{ customText: 'Kiosk Mode' }}
            timeout={8000}>
            <YourApp />
        </ScreensaverManager>
    );
}

// Example with Starfield
function AppWithStarfield() {
    return (
        <ScreensaverManager
            component={StarfieldScreensaver}
            componentProps={{ starCount: 600, speed: 5 }}
            timeout={15000}>
            <YourApp />
        </ScreensaverManager>
    );
}

// Example with Image Slider
function AppWithImages() {
    return (
        <ScreensaverManager
            component={ImageSliderScreensaver}
            componentProps={{
                images: ['/images/photo1.jpg', '/images/photo2.jpg', '/images/photo3.jpg'],
                customText: 'My Gallery',
                showTime: true,
                showDate: true,
                interval: 5000,
            }}
            timeout={12000}>
            <YourApp />
        </ScreensaverManager>
    );
}
```

### Example 2: Custom Screensaver with Context

Create a custom screensaver that responds to user interaction:

```tsx
import { ScreensaverContext } from '@mohamedfariz/react-idle-screensaver';
import { useContext } from 'react';

const InteractiveScreensaver = () => {
    const { stopScreensaver } = useContext(ScreensaverContext);

    return (
        <div
            onClick={stopScreensaver}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                cursor: 'pointer',
            }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Welcome Back!</h1>
            <p style={{ fontSize: '1.5rem' }}>👆 Tap anywhere to continue</p>
        </div>
    );
};

// Use it in your app
function App() {
    return (
        <ScreensaverManager component={InteractiveScreensaver} timeout={10000}>
            <YourApp />
        </ScreensaverManager>
    );
}
```

### Example 3: With Callbacks and Dynamic Control

```tsx
import { useState } from 'react';
import { ScreensaverManager, MatrixScreensaver } from '@mohamedfariz/react-idle-screensaver';

function App() {
    const [isActive, setIsActive] = useState(true);
    const [timeout, setTimeout] = useState(5000);

    const handleScreensaverStop = () => {
        console.log('User is back!');
        // Log analytics, reset timers, etc.
    };

    return (
        <div>
            <div style={{ padding: '20px', background: '#f0f0f0' }}>
                <button onClick={() => setIsActive(!isActive)}>
                    {isActive ? 'Disable' : 'Enable'} Screensaver
                </button>
                <input
                    type='number'
                    value={timeout / 1000}
                    onChange={(e) => setTimeout(Number(e.target.value) * 1000)}
                />
                <span> seconds</span>
            </div>

            <ScreensaverManager
                component={MatrixScreensaver}
                componentProps={{
                    color: '#00ff00',
                    speed: 30,
                }}
                timeout={timeout}
                active={isActive}
                zIndex={9999}
                onScreenSaverStop={handleScreensaverStop}>
                <div style={{ padding: '20px' }}>
                    <h1>My Dashboard</h1>
                    <p>Content goes here...</p>
                </div>
            </ScreensaverManager>
        </div>
    );
}
```

### Example 4: Custom Screensaver with Props

```tsx
interface BrandedScreensaverProps {
    companyName: string;
    logoUrl?: string;
    backgroundColor?: string;
    tagline?: string;
}

const BrandedScreensaver: React.FC<BrandedScreensaverProps> = ({
    companyName,
    logoUrl,
    backgroundColor = '#1a1a1a',
    tagline,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor,
                color: 'white',
            }}>
            {logoUrl && (
                <img
                    src={logoUrl}
                    alt={`${companyName} logo`}
                    style={{ width: '200px', marginBottom: '2rem' }}
                />
            )}
            <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>{companyName}</h1>
            {tagline && <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>{tagline}</p>}
        </div>
    );
};

// Use it
function App() {
    return (
        <ScreensaverManager
            component={BrandedScreensaver}
            componentProps={{
                companyName: 'ACME Corporation',
                logoUrl: '/logo.svg',
                backgroundColor: '#2c3e50',
                tagline: 'Innovation at its finest',
            }}
            timeout={10000}>
            <YourApp />
        </ScreensaverManager>
    );
}
```

---

## 🛠 Built-in Screensavers

| Component              | Description                                   |
| ---------------------- | --------------------------------------------- |
| BouncingScreensaver    | Floating badge that bounces around the screen |
| MatrixScreensaver      | Matrix-style falling characters               |
| ImageSliderScreensaver | Fullscreen image slideshow with clock         |
| StarfieldScreensaver   | Animated starfield / space-warp effect        |

## 📘 API Reference

### `<ScreensaverManager />`

The main wrapper component that handles idle detection and screensaver display.

| Prop                | Type               | Default | Description                                    |
| ------------------- | ------------------ | ------- | ---------------------------------------------- |
| `component`         | `ComponentType<T>` | —       | The screensaver component to display           |
| `componentProps`    | `T`                | `{}`    | Props to pass to the screensaver component     |
| `timeout`           | `number`           | `5000`  | Idle timeout in milliseconds before activation |
| `active`            | `boolean`          | `true`  | Enable or disable the screensaver              |
| `zIndex`            | `number`           | `50`    | CSS z-index for the screensaver overlay        |
| `onScreenSaverStop` | `() => void`       | —       | Callback function when user resumes activity   |
| `children`          | `ReactNode`        | —       | Your application content                       |

**Example:**

```tsx
<ScreensaverManager
    component={MatrixScreensaver}
    timeout={10000}
    active={true}
    zIndex={100}
    onScreenSaverStop={() => console.log('User is back!')}>
    <YourApp />
</ScreensaverManager>
```

---

### Built-in Screensaver Components

#### `<BouncingScreensaver />`

A floating badge that smoothly bounces around the screen edges.

| Prop         | Type     | Default            | Description                           |
| ------------ | -------- | ------------------ | ------------------------------------- |
| `customText` | `string` | `"System Standby"` | Text to display on the bouncing badge |

**Example:**

```tsx
<ScreensaverManager
    component={BouncingScreensaver}
    componentProps={{
        customText: 'Idle Mode',
    }}
    timeout={5000}>
    <YourApp />
</ScreensaverManager>
```

---

#### `<MatrixScreensaver />`

Classic Matrix-style falling characters effect with customizable appearance.

| Prop         | Type     | Default                                        | Description                                    |
| ------------ | -------- | ---------------------------------------------- | ---------------------------------------------- |
| `characters` | `string` | `"01アイウエオカキクケコサシスセソタチツテト"` | Characters to display in the falling animation |
| `fontSize`   | `number` | `14`                                           | Font size in pixels                            |
| `speed`      | `number` | `33`                                           | Animation speed in ms (lower = faster)         |
| `color`      | `string` | `"#0f0"`                                       | Color of the matrix characters (CSS color)     |

**Example:**

```tsx
<ScreensaverManager
    component={MatrixScreensaver}
    componentProps={{
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        fontSize: 16,
        speed: 40,
        color: '#00ff00',
    }}
    timeout={8000}>
    <YourApp />
</ScreensaverManager>
```

---

#### `<ImageSliderScreensaver />`

Fullscreen image slideshow with optional clock and date display.

| Prop         | Type       | Default                              | Description                                    |
| ------------ | ---------- | ------------------------------------ | ---------------------------------------------- |
| `customText` | `string`   | `"Photography Collection"`           | Text displayed at the bottom of the screen     |
| `showTime`   | `boolean`  | `true`                               | Show current time in HH:MM format              |
| `showDate`   | `boolean`  | `true`                               | Show current date (e.g., "Monday, January 25") |
| `images`     | `string[]` | _Array of 4 default Unsplash images_ | Array of image URLs to display                 |
| `interval`   | `number`   | `6000`                               | Time between slides in milliseconds            |

**Example:**

```tsx
<ScreensaverManager
    component={ImageSliderScreensaver}
    componentProps={{
        customText: 'Company Showcase',
        showTime: true,
        showDate: true,
        images: [
            '/images/slide1.jpg',
            '/images/slide2.jpg',
            '/images/slide3.jpg',
            'https://example.com/image.jpg',
        ],
        interval: 5000,
    }}
    timeout={10000}>
    <YourApp />
</ScreensaverManager>
```

**Default Images:**

- Mountain landscape
- City skyline
- Technology/circuit boards
- Desert landscape

---

#### `<StarfieldScreensaver />`

Animated 3D starfield effect simulating space travel.

| Prop        | Type     | Default | Description                              |
| ----------- | -------- | ------- | ---------------------------------------- |
| `starCount` | `number` | `400`   | Number of stars to render                |
| `speed`     | `number` | `4`     | Speed of star movement (higher = faster) |

**Example:**

```tsx
<ScreensaverManager
    component={StarfieldScreensaver}
    componentProps={{
        starCount: 800,
        speed: 6,
    }}
    timeout={7000}>
    <YourApp />
</ScreensaverManager>
```

## 🪝 Advanced: useIdleTimer Hook

For more granular control, you can use the `useIdleTimer` hook directly in your components:

```tsx
import { useIdleTimer } from '@mohamedfariz/react-idle-screensaver';

function MyComponent() {
    const isIdle = useIdleTimer(5000, true);

    return (
        <div>
            <p>Status: {isIdle ? 'User is idle' : 'User is active'}</p>
        </div>
    );
}
```

### Hook Parameters

| Parameter | Type      | Default | Description                            |
| --------- | --------- | ------- | -------------------------------------- |
| `timeout` | `number`  | `5000`  | Time in milliseconds before idle state |
| `active`  | `boolean` | `true`  | Whether the idle detection is enabled  |

### Hook Return Value

Returns a `boolean` indicating whether the user is currently idle.

### Example: Custom Idle Behavior

````tsx
import { useIdleTimer } from "@mohamedfariz/react-idle-screensaver";
import { useEffect } from "react";

function Dashboard() {
    const isIdle = useIdleTimer(10000);

    useEffect(() => {
        if (isIdle) {
            console.log('User went idle - pausing animations');
            // Pause expensive operations
        } else {
            console.log('User is active - resuming animations');
            // Resume operations
        }
    }, [isIdle]);

    return (
        <div style={{ opacity: isIdle ? 0.5 : 1 }}>
            <h1>Dashboard</h1>
            {/* Your content */}
        </div>
    );
}

## 🎯 Intended Use Cases

- **Kiosks and digital signage** - Prevent screen burn-in with automatic screensavers
- **Unattended applications** - Provide visual feedback when system is idle
- **TV and dashboard interfaces** - Keep displays visually engaging
- **Long-running displays** - Reduce power consumption and extend screen life
- **Public terminals** - Privacy protection by hiding sensitive information
- **Reception areas** - Display branded content when not in use

---

## 🔧 Troubleshooting

### Screensaver Not Appearing

**Issue:** Screensaver doesn't activate after timeout period.

**Solutions:**
1. Ensure CSS is imported:
   ```tsx
   import '@mohamedfariz/react-idle-screensaver/style.css';
````

2. Check that `active` prop is not set to `false`:

    ```tsx
    <ScreensaverManager active={true} ... />
    ```

3. Verify timeout is set correctly (value is in milliseconds):
    ```tsx
    <ScreensaverManager timeout={5000} ... /> {/* 5 seconds */}
    ```

### Styles Not Applied

**Issue:** Built-in screensavers appear unstyled or broken.

**Solutions:**

1. Import the CSS file at the top of your main entry file:

    ```tsx
    // In main.tsx, App.tsx, or index.tsx
    import '@mohamedfariz/react-idle-screensaver/style.css';
    ```

2. If using a bundler, ensure CSS files are processed. For Vite, this works automatically. For Webpack, ensure you have `css-loader` configured.

### TypeScript Errors

**Issue:** TypeScript complains about missing types or prop types.

**Solutions:**

1. Ensure you're importing from the correct path:

    ```tsx
    import { ScreensaverManager, MatrixScreensaver } from '@mohamedfariz/react-idle-screensaver';
    ```

2. Explicitly type your custom screensaver props:

    ```tsx
    interface MyProps {
        message: string;
    }

    const MyScreensaver: React.FC<MyProps> = ({ message }) => {
        return <div>{message}</div>;
    };
    ```

### Screensaver Stuck/Won't Dismiss

**Issue:** Screensaver activates but won't dismiss on user interaction.

**Solutions:**

1. Check that you haven't set `pointer-events: none` on parent elements
2. Ensure no modal or overlay is blocking interaction
3. The screensaver automatically dismisses on:
    - Mouse movement
    - Mouse clicks
    - Keyboard input
    - Touch events

### Performance Issues

**Issue:** Application feels sluggish or animations are choppy.

**Solutions:**

1. For `MatrixScreensaver`, reduce character count or increase speed:

    ```tsx
    <ScreensaverManager component={MatrixScreensaver} componentProps={{ fontSize: 16, speed: 50 }} />
    ```

2. For `StarfieldScreensaver`, reduce star count:

    ```tsx
    <ScreensaverManager component={StarfieldScreensaver} componentProps={{ starCount: 200 }} />
    ```

3. For `ImageSliderScreensaver`, optimize images (compress, reduce resolution)

### Images Not Loading in ImageSliderScreensaver

**Issue:** Images don't appear in the slider.

**Solutions:**

1. Verify image URLs are accessible:

    ```tsx
    componentProps={{
        images: [
            '/public/image1.jpg',  // ❌ Wrong for Vite
            '/image1.jpg',         // ✅ Correct for Vite (in public folder)
            'https://example.com/image.jpg'  // ✅ External URL
        ]
    }}
    ```

2. Check browser console for CORS errors if using external images
3. Ensure images are in the correct public directory for your bundler

---

## ⚠️ Notes & Limitations

### Browser Only

This library is designed for **browser environments only** and will not work in Node.js or SSR (Server-Side Rendering) contexts during the render phase. The components safely check for `window` availability.

### CSS Import Required

You **must** manually import the CSS file in your application:

```tsx
import '@mohamedfariz/react-idle-screensaver/style.css';
```

The library does not automatically inject styles to give you control over CSS loading strategy.

### Event Detection

The screensaver deactivates on:

- `mousemove`
- `mousedown`
- `keydown`
- `touchstart`
- `wheel` (scroll)

These events are attached at the document level for maximum compatibility.

### Z-Index Considerations

The default `zIndex` is `50`. If your application uses higher z-index values (e.g., modals, dropdowns), you may need to adjust:

```tsx
<ScreensaverManager zIndex={9999} ... />
```

### Performance

- Canvas-based screensavers (Matrix, Starfield) use `requestAnimationFrame` for smooth 60 FPS animations
- All animations are optimized with `will-change` CSS properties where appropriate
- For best performance on low-end devices, reduce complexity (fewer stars, larger fonts, etc.)

### Memory Management

All components properly clean up:

- Event listeners on unmount
- `setInterval` timers
- `requestAnimationFrame` calls
- Canvas contexts

No memory leaks should occur during normal usage.

### React Version

Requires **React 18.0.0 or higher** due to modern Context API usage.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/mohamedfariz/react-idle-screensaver/issues)
- **Discussions:** [GitHub Discussions](https://github.com/mohamedfariz/react-idle-screensaver/discussions)

---

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and improvements.

---

Made with ❤️ for the React community
