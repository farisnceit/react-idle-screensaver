# @farizbytes/react-idle-screensaver

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

## 📦 Installation

```bash
npm install @farizbytes/react-idle-screensaver@beta
```

or

```bash
yarn add @farizbytes/react-idle-screensaver@beta
```

or

```bash
pnpm add @farizbytes/react-idle-screensaver@beta
```

or

```bash
bun add @farizbytes/react-idle-screensaver@beta
```

## 🎨 Import CSS

```tsx
import '@farizbytes/react-idle-screensaver/style.css';
```

## Basic Usage

```tsx
import { ScreensaverManager, BouncingScreensaver } from '@farizbytes/react-idle-screensaver';

function App() {
    return (
        <ScreensaverManager component={BouncingScreensaver} timeout={5000}>
            <div style={{ height: '100vh' }}>
                <h1>My Application</h1>
            </div>
        </ScreensaverManager>
    );
}

export default App;
```

## 🧩 Using a Custom Screensaver

Create your own custom screensaver component and pass it to the `ScreensaverManager`:

```tsx
import { ScreensaverManager } from '@farizbytes/react-idle-screensaver';

const MyScreensaver = () => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
        }}>
        Custom Screensaver Content
    </div>
);

function App() {
    return <ScreensaverManager component={MyScreensaver} timeout={10000} />;
}

export default App;
```

### Passing Props to Custom Screensaver

You can pass custom props to your screensaver component:

```tsx
interface CustomScreensaverProps {
    message: string;
    showLogo?: boolean;
}

const MyScreensaver: React.FC<CustomScreensaverProps> = ({ message, showLogo }) => (
    <div className='custom-screensaver'>
        {showLogo && (
            <svg width='80' height='80' viewBox='0 0 80 80'>
                <rect width='80' height='80' fill='#667eea' rx='8' />
            </svg>
        )}
        <h1>{message}</h1>
    </div>
);

function App() {
    return (
        <ScreensaverManager
            component={MyScreensaver}
            componentProps={{
                message: 'Welcome to Our Kiosk',
                showLogo: true,
            }}
            timeout={10000}
        />
    );
}
```

### Using Screensaver Context

Access screensaver state and controls from within your custom component:

```tsx
import { ScreensaverContext } from '@farizbytes/react-idle-screensaver';
import { useContext } from 'react';

const MyScreensaver = () => {
    const { stopScreensaver } = useContext(ScreensaverContext);

    return (
        <div onClick={stopScreensaver}>
            <h1>Tap to Continue</h1>
        </div>
    );
};
```

## 🛠 Built-in Screensavers

| Component              | Description                                   |
| ---------------------- | --------------------------------------------- |
| BouncingScreensaver    | Floating badge that bounces around the screen |
| MatrixScreensaver      | Matrix-style falling characters               |
| ImageSliderScreensaver | Fullscreen image slideshow with clock         |
| StarfieldScreensaver   | Animated starfield / space-warp effect        |

## 📘 API Reference

<ScreensaverManager />
Prop	Type	Default	Description
component	ComponentType<T>	—	Screensaver component
componentProps	T	{}	Props passed to screensaver
timeout	number	5000	Idle timeout (ms)
active	boolean	true	Enable / disable screensaver
zIndex	number	50	Overlay z-index
onScreenSaverStop	() => void	—	Callback when user resumes

## 🔧 Hook: useIdleTimer

```tsx
import { useIdleTimer } from "@farizbytes/react-idle-screensaver";

const isIdle = useIdleTimer(timeout?, active?);
```

## 🎯 Intended Use Cases

- Kiosks and digital signage
- Unattended applications
- TV and dashboard interfaces
- Long-running displays
- Public or unattended terminals

## ⚠️ Notes & Limitations

- Browser-only (no Node rendering)
- Consumers must import CSS explicitly
