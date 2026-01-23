# Fix: TypeScript Not Finding New Exports

## Problem

After adding new exports (`SimpleTestScreensaver`, `ScreensaverManagerDebug`), TypeScript in your test app shows:

```
Module '"@farizbytes/react-idle-screensaver"' has no exported member 'SimpleTestScreensaver'.
```

## Solution

### Option 1: Restart TypeScript Server (Quickest)

In VS Code:

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: "TypeScript: Restart TS Server"
3. Press Enter

### Option 2: Re-link the Package

In your test app directory:

```bash
# Unlink the package
npm unlink @farizbytes/react-idle-screensaver

# Re-link it
npm link d:\Plugins\react-idle-screensaver
```

### Option 3: Restart Dev Server

If using Vite, Next.js, or Create React App:

```bash
# Stop the dev server (Ctrl+C)
# Then restart it
npm run dev
# or
npm start
```

### Option 4: Clear Node Modules Cache (Nuclear Option)

In your test app:

```bash
rm -rf node_modules/.cache
# or on Windows PowerShell:
Remove-Item -Recurse -Force node_modules\.cache
```

## Verify the Fix

After trying one of the above, check if the import works:

```tsx
import {
  ScreensaverManager,
  SimpleTestScreensaver, // ✅ Should work now
  ScreensaverManagerDebug, // ✅ Should work now
} from "@farizbytes/react-idle-screensaver";
```

## Quick Test Code

Once TypeScript recognizes the exports, use this to test:

```tsx
import {
  ScreensaverManager,
  SimpleTestScreensaver,
} from "@farizbytes/react-idle-screensaver";

function App() {
  return (
    <ScreensaverManager component={SimpleTestScreensaver} timeout={5000}>
      <div style={{ padding: "2rem" }}>
        <h1>Testing Screensaver</h1>
        <p>Don't move your mouse for 5 seconds...</p>
      </div>
    </ScreensaverManager>
  );
}

export default App;
```

## What's Exported Now

The package now exports:

- ✅ `ScreensaverManager` - Main component
- ✅ `ScreensaverManagerDebug` - Debug version with console logs
- ✅ `SimpleTestScreensaver` - Basic test screensaver
- ✅ `ImageSliderScreensaver` - Image slider screensaver
- ✅ `BouncingScreensaver` - Bouncing logo screensaver
- ✅ `MatrixScreensaver` - Matrix effect screensaver
- ✅ `StarfieldScreensaver` - Starfield effect screensaver
- ✅ `useIdleTimer` - Hook for idle detection
- ✅ `ScreensaverContext` - Context for custom screensavers
