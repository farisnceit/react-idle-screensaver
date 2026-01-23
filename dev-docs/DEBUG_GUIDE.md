# Debug Mode - Finding the Blinking Issue

## The blinking is still happening. Let's find out why!

I've added comprehensive debug logging to help identify the exact cause.

## How to Use Debug Mode

### In your test app:

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
      debug={true} // ← Enable debug mode
    >
      <div style={{ padding: "2rem" }}>
        <h1>Testing Screensaver</h1>
        <p>Open browser console and wait 5 seconds...</p>
      </div>
    </ScreensaverManager>
  );
}
```

## What to Look For in Console

### Normal Behavior (No Blinking):

```
[useIdleTimer] Setting up event listeners for: mousedown, mousemove, keypress, scroll, touchstart
[useIdleTimer] Idle timeout: 5000ms
[useIdleTimer] resetTimer called (event #1), currently idle: false
[ScreensaverManager] Render - isIdle: false, shouldShow: false
... wait 5 seconds ...
[useIdleTimer] Idle timeout reached after 5000ms
[useIdleTimer] isIdle changed to: true
[ScreensaverManager] Render - isIdle: true, shouldShow: true
... screensaver shows ...
... move mouse ...
[useIdleTimer] resetTimer called (event #2), currently idle: true
[useIdleTimer] Triggering onActive callback
[useIdleTimer] Setting isIdle to false
[useIdleTimer] isIdle changed to: false
[ScreensaverManager] Render - isIdle: false, shouldShow: false
```

### Blinking Behavior (Problem):

Look for:

1. **Rapid event firing**: Event count jumping quickly (event #1, #2, #3, #4... in quick succession)
2. **isIdle toggling**: `isIdle changed to: true` immediately followed by `isIdle changed to: false`
3. **Multiple renders**: Many `[ScreensaverManager] Render` logs in quick succession
4. **Unexpected resetTimer calls**: resetTimer being called when you're not moving the mouse

## Common Causes to Check

### 1. Parent Component Re-rendering

If your App component re-renders frequently, it will cause ScreensaverManager to re-render.

**Check for:**

```tsx
// BAD - This causes re-renders every second
function App() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <ScreensaverManager ... />;  // Re-renders every second!
}
```

**Fix:**

```tsx
// GOOD - State is isolated
function App() {
  return <ScreensaverManager ... />;
}
```

### 2. Event Listeners in Your App

Check if your app has event listeners that might interfere:

```tsx
// BAD - This might trigger during screensaver
useEffect(() => {
  const handler = () => {
    // This might cause state changes
    doSomething();
  };
  window.addEventListener("mousemove", handler);
  return () => window.removeEventListener("mousemove", handler);
}, []);
```

### 3. React Strict Mode (Development Only)

In development, React Strict Mode causes double-renders. This is normal but might look like blinking in logs.

```tsx
// In your index.tsx or main.tsx
<React.StrictMode>
  {" "}
  {/* Remove this temporarily to test */}
  <App />
</React.StrictMode>
```

### 4. CSS Transitions/Animations

Check if any CSS is causing layout shifts:

```css
/* BAD - This might cause reflows */
* {
  transition: all 0.3s;
}
```

## Next Steps

1. **Enable debug mode** in your test app
2. **Open browser console** (F12)
3. **Wait for screensaver** to appear
4. **Copy all console logs** and share them with me
5. **Note the exact behavior**: Does it blink once? Multiple times? Constantly?

## What to Share

Please provide:

1. ✅ Full console output from debug mode
2. ✅ Description of blinking pattern (once, multiple times, constant)
3. ✅ Your App component code (to check for re-render causes)
4. ✅ Browser and version (Chrome, Firefox, etc.)
5. ✅ Are you using React Strict Mode?

This will help me pinpoint the exact cause!
