# CSS Linking in Test App

## ✅ CSS Successfully Linked

The test-app now imports the CSS directly from the plugin's dist folder.

---

## 📁 **Setup**

### **File:** `test-app/src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@farizbytes/react-idle-screensaver/dist/index.esm.css' // ✅ Plugin CSS
import App from './App.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## 🎯 **What This Does**

The import statement:
```jsx
import '@farizbytes/react-idle-screensaver/dist/index.esm.css'
```

**Loads all screensaver styles including:**
- `.ris-starfield` - Starfield screensaver container
- `.ris-slider` - Image slider container
- `.ris-slide` - Individual slide animations
- `.ris-overlay-gradient` - Gradient overlays
- `.ris-slider-content` - Content positioning
- `.ris-clock`, `.ris-time`, `.ris-date` - Clock display
- `.ris-footer` - Footer styling

---

## 🔄 **How It Works**

1. **Package builds CSS:**
   ```bash
   cd f:\farudesigns\plugins\react-idle-screensaver
   npm run build
   ```
   This creates `dist/index.esm.css` (910 bytes, minified)

2. **Test-app references package:**
   ```json
   "@farizbytes/react-idle-screensaver": "file:.."
   ```

3. **Vite resolves the import:**
   - Finds the CSS in `node_modules/@farizbytes/react-idle-screensaver/dist/index.esm.css`
   - Processes and injects it into the page

4. **Styles are applied:**
   - All screensaver components get their styles
   - No manual CSS copying needed

---

## 🎨 **Screensavers Using These Styles**

### **ImageSliderScreensaver**
Uses classes:
- `.ris-slider` - Container
- `.ris-slide` - Slides with fade/zoom transitions
- `.ris-overlay-gradient` - Dark gradient overlay
- `.ris-slider-content` - Content layout
- `.ris-clock`, `.ris-time`, `.ris-date` - Clock display
- `.ris-footer` - Footer text

### **StarfieldScreensaver**
Uses classes:
- `.ris-starfield` - Canvas container

### **Other Screensavers**
- **SimpleTestScreensaver** - Inline styles (no CSS needed)
- **MatrixScreensaver** - Canvas-based (no CSS needed)
- **BouncingScreensaver** - Inline styles (no CSS needed)

---

## 🔧 **Development Workflow**

### **When You Make CSS Changes:**

1. **Edit source CSS:**
   ```
   src/styles/image-slider.css
   src/styles/starfield.css
   ```

2. **Rebuild the package:**
   ```bash
   npm run build
   ```

3. **Reinstall in test-app** (with `file:..` setup):
   ```bash
   cd test-app
   npm install
   ```

4. **Vite auto-reloads** - Changes appear immediately!

### **For Live Development:**

Use `npm run watch` in the package directory:
```bash
# Terminal 1: Watch and rebuild on changes
cd f:\farudesigns\plugins\react-idle-screensaver
npm run watch

# Terminal 2: Run test app
cd test-app
npm run dev
```

Then reinstall in test-app when you see changes.

---

## ✅ **Verification**

### **Check if CSS is loaded:**

1. **Open browser DevTools** (F12)
2. **Go to Elements/Inspector tab**
3. **Look for styles** with `.ris-` prefix
4. **Check Sources tab** - You should see the CSS file

### **Test screensavers:**

1. Select **"Image Slider"** from dropdown
2. Wait 5 seconds for screensaver
3. Should see:
   - ✅ Smooth fade/zoom transitions
   - ✅ Gradient overlay
   - ✅ Clock in top-right
   - ✅ Footer at bottom

---

## 📦 **For Production Use**

When consumers install your package from npm:

```bash
npm install @farizbytes/react-idle-screensaver
```

They should import the CSS in their app:

```jsx
// Option 1: Import in main entry file
import '@farizbytes/react-idle-screensaver/dist/index.esm.css'

// Option 2: Let components auto-import (if using a bundler)
// Just import the component - CSS comes with it
import { ImageSliderScreensaver } from '@farizbytes/react-idle-screensaver'
```

---

## 🎯 **Summary**

✅ **CSS is now linked** from plugin dist to test-app  
✅ **All screensaver styles** are loaded  
✅ **Vite handles** the CSS processing  
✅ **Auto-reloads** when CSS changes (after rebuild)  
✅ **Production-ready** setup  

---

**Last Updated:** January 22, 2026  
**CSS File:** `dist/index.esm.css` (910 bytes, minified)  
**Import Location:** `test-app/src/main.jsx`
