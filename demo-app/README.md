# React Idle Screensaver - Test Application

This is a comprehensive test application for verifying the fixes to the blinking/flickering issue in the `@farizbytes/react-idle-screensaver` package.

## 🎯 Purpose

This test app was created to verify that the following issues have been resolved:
1. ✅ Infinite re-render loops causing blinking
2. ✅ Event listener re-initialization spam
3. ✅ Rogue HTML elements causing rendering issues
4. ✅ Incomplete dependency tracking

## 🚀 Running the Test App

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Open http://localhost:5173/
```

## 🧪 How to Test

1. **Wait for idle:** Stop all mouse/keyboard activity for 5 seconds
2. **Observe:** The screensaver should appear smoothly without blinking
3. **Dismiss:** Move your mouse or press any key
4. **Check console:** With debug enabled, verify no "Cleaning up" spam
5. **Repeat:** Test multiple times to ensure consistency

## ✅ Expected Behavior

- ✅ Screensaver appears smoothly after timeout
- ✅ No blinking or flickering
- ✅ Dismisses immediately on activity
- ✅ No "Cleaning up" spam in console
- ✅ Stable event listener management

## ❌ Issues to Watch For

- ❌ Rapid idle/active state changes
- ❌ Event listener re-initialization loops
- ❌ Console spam
- ❌ Delayed dismissal

## 🎨 Features

### Status Monitor
- Real-time debug mode status
- Idle timeout display
- Activity event counter
- Last event tracker

### Controls
- 5 different screensaver types
- Adjustable timeout (3-30 seconds)
- Debug mode toggle

### Interactive Test Area
- Text input for keyboard testing
- Buttons for click testing
- Mouse activity zone

## 📊 Test Results

See `VERIFICATION_REPORT.md` in the parent directory for complete test results.

## 🔧 Package Link

This test app uses the local package via:
```json
"@farizbytes/react-idle-screensaver": "file:.."
```

Any changes to the parent package will be reflected after rebuilding.

## 📝 Notes

- Debug mode is enabled by default for testing
- Console logs help verify proper behavior
- All screensavers use the same core logic
- The test interface is fully responsive

---

**Status:** ✅ All tests passing  
**Last Updated:** January 22, 2026
