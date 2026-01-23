# Testing Guide for Blinking Issue

## Quick Test Components

I've created two new components to help debug the blinking issue:

### 1. SimpleTestScreensaver

A basic screensaver with **inline styles only** (no external CSS dependencies):

- Shows a large color-changing clock
- Uses high z-index (9999) to ensure visibility
- No CSS file dependencies

### 2. ScreensaverManagerDebug

A debug version of ScreensaverManager with console logging

## How to Test in Your App

### Step 1: Rebuild the package

The watch command should auto-rebuild, but if needed:

```bash
npm run build
```

### Step 2: In your test app, use the SimpleTestScreensaver

```tsx
import { ScreensaverManager, SimpleTestScreensaver } from '@farizbytes/react-idle-screensaver';

function App() {
    return (
        <ScreensaverManager component={SimpleTestScreensaver} timeout={5000}>
            <div>
                <h1>Your App Content</h1>
                <p>Wait 5 seconds without moving mouse...</p>
            </div>
        </ScreensaverManager>
    );
}
```

### Step 3: Use Debug Version (Optional)

```tsx
import { ScreensaverManagerDebug, SimpleTestScreensaver } from '@mohamedfariz/react-idle-screensaver';

function App() {
    return (
        <ScreensaverManagerDebug component={SimpleTestScreensaver} timeout={5000}>
            <div>
                <h1>Your App Content</h1>
                <p>Check browser console for debug logs...</p>
            </div>
        </ScreensaverManagerDebug>
    );
}
```

## What to Check

### In Browser Console:

Look for these debug messages:

- `🔍 ScreensaverManager Debug:` - Shows state on every render
- `✅ Screensaver STARTED` - When screensaver activates
- `🛑 Screensaver STOPPED` - When user interacts

### Common Issues to Look For:

1. **Rapid re-renders**: If you see many debug logs in quick succession
2. **isIdle toggling**: If isIdle keeps switching true/false
3. **Event conflicts**: Check if your app has event listeners that might interfere

## Possible Causes of Blinking

### 1. Event Listener Conflicts

Your app might have event listeners that trigger on screensaver show:

```tsx
// BAD - This could cause issues
useEffect(() => {
    const handler = () => console.log('mouse moved');
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
}, []);
```

### 2. CSS Conflicts

The ImageSliderScreensaver uses external CSS. Check if:

- CSS is loading properly
- There are z-index conflicts
- Transitions are causing issues

### 3. React Strict Mode

If using React 18+ Strict Mode in development, it causes double-renders:

```tsx
// In your index.tsx/main.tsx
<React.StrictMode>
    {' '}
    {/* This causes double-renders in dev */}
    <App />
</React.StrictMode>
```

### 4. Parent Component Re-renders

If the parent component of ScreensaverManager re-renders frequently:

```tsx
// BAD
function App() {
    const [count, setCount] = useState(0);

    // This causes ScreensaverManager to re-render every second
    useEffect(() => {
        const timer = setInterval(() => setCount((c) => c + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <ScreensaverManager component={ImageSliderScreensaver} timeout={5000}>
            <div>Count: {count}</div>
        </ScreensaverManager>
    );
}
```

## Next Steps

1. **Test with SimpleTestScreensaver first**
    - If this works → The issue is with ImageSliderScreensaver CSS
    - If this blinks too → The issue is with the manager or your app setup

2. **Use ScreensaverManagerDebug**
    - Check console logs to see what's happening
    - Look for rapid state changes

3. **Share the console output**
    - Let me know what you see in the debug logs
    - This will help identify the exact issue

## Expected Behavior

✅ **Correct:**

- Wait 5 seconds → Screensaver appears
- Move mouse → Screensaver disappears
- Wait 5 seconds again → Screensaver appears

❌ **Blinking (Wrong):**

- Screensaver appears and disappears rapidly
- Screensaver flickers
- Screensaver shows for a split second then hides
