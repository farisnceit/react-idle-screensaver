# Screensaver Blinking Issue - Investigation & Fixes

## Status: Still Investigating

The blinking issue persists even after multiple fixes. Here's what we've done and what to try next.

## Fixes Applied

### 1. ✅ Fixed useIdleTimer Hook

**Problem**: `isIdle` in dependency array caused event listener churn
**Fix**: Used `isIdleRef` to track state without causing re-renders
**File**: `src/hooks/useIdleTimer.ts`

### 2. ✅ Refactored ScreensaverManager

**Problem**: Conditional display might cause layout thrashing
**Fix**: Changed to conditional rendering (early return pattern)
**File**: `src/manager/ScreensaverManager.tsx`

### 3. ✅ Added Debug Mode

**Feature**: Comprehensive console logging to identify the issue
**Usage**: Set `debug={true}` prop on ScreensaverManager

### 4. ✅ Created SimpleTestScreensaver

**Purpose**: Minimal screensaver with inline styles to rule out CSS issues
**File**: `src/screensavers/SimpleTestScreensaver.tsx`

## How to Test with Debug Mode

### Step 1: Rebuild Package

```bash
cd d:\Plugins\react-idle-screensaver
npm run build
```

### Step 2: In Your Test App

```tsx
import {
  ScreensaverManager,
  SimpleTestScreensaver,
} from "@farizbytes/react-idle-screensaver";

function App() {
  return (
    <ScreensaverManager
      component={SimpleTestScreensaver}
      timeout={5000}
      debug={true} // ← Enable debug logging
    >
      <div style={{ padding: "2rem" }}>
        <h1>Debug Test</h1>
        <p>Open console (F12) and wait 5 seconds...</p>
      </div>
    </ScreensaverManager>
  );
}
```

### Step 3: Check Console Output

Open browser console and look for patterns like:

- Rapid event firing
- isIdle toggling quickly
- Multiple renders in succession
- Unexpected resetTimer calls

## Possible External Causes

Since the issue persists even with SimpleTestScreensaver, the problem might be in your test app:

### 1. Parent Component Re-renders

```tsx
// Check if your App component has:
- useState that updates frequently
- setInterval/setTimeout that triggers re-renders
- Context providers that update often
```

### 2. Global Event Listeners

```tsx
// Check for:
- window.addEventListener in your app
- Document event listeners
- Third-party libraries adding events
```

### 3. React Strict Mode

```tsx
// In development, this causes double-renders:
<React.StrictMode>
  <App />
</React.StrictMode>
```

### 4. CSS/Layout Issues

```css
/* Check for:
- Global transitions
- Position: fixed conflicts
- Z-index stacking issues
*/
```

## What I Need to Debug Further

Please share:

1. **Console output** with `debug={true}` enabled
2. **Your App component code** (the one using ScreensaverManager)
3. **Blinking pattern**:
   - Does it blink once when appearing?
   - Does it blink continuously?
   - Does it appear then disappear immediately?
4. **Browser**: Chrome, Firefox, Safari, Edge?
5. **React version** in your test app
6. **Are you using React Strict Mode?**

## Files Modified

- `src/hooks/useIdleTimer.ts` - Fixed dependencies, added debug mode
- `src/manager/ScreensaverManager.tsx` - Refactored rendering, added debug
- `src/manager/ScreensaverManagerDebug.tsx` - Debug version (deprecated, use debug prop instead)
- `src/screensavers/SimpleTestScreensaver.tsx` - Minimal test component
- `src/types.ts` - Added debug prop type
- `src/index.ts` - Exported new components

## Next Actions

1. **Enable debug mode** and share console output
2. **Share your App component code**
3. **Try removing React.StrictMode** temporarily
4. **Test in different browser** to rule out browser-specific issues
5. **Check for third-party libraries** that might interfere

The debug logs will tell us exactly what's happening!
