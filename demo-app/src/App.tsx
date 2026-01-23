import { useState, useEffect } from 'react';
import {
    ScreensaverManager,
    SimpleTestScreensaver,
    ImageSliderScreensaver,
    MatrixScreensaver,
    StarfieldScreensaver,
    BouncingScreensaver,
} from '@mohamedfariz/react-idle-screensaver';
import '@mohamedfariz/react-idle-screensaver/style.css';
import './App.css';

const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920',
];

type ScreensaverType = 'simple' | 'slider' | 'matrix' | 'starfield' | 'bouncing';

function App() {
    // Sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Theme state
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as 'light' | 'dark') || 'dark';
    });

    // Apply theme on mount and change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    // Core settings
    const [screensaverType, setScreensaverType] = useState<ScreensaverType>('bouncing');
    const [timeout, setTimeout] = useState(5000);
    const [active, setActive] = useState(true);
    const [zIndex, setZIndex] = useState(9999);
    const [debug, setDebug] = useState(false);

    // Bouncing props
    const [bouncingText, setBouncingText] = useState('System Standby');

    // Matrix props
    const [matrixChars, setMatrixChars] = useState('01アイウエオカキクケコサシスセソタチツテト');
    const [matrixFontSize, setMatrixFontSize] = useState(14);
    const [matrixSpeed, setMatrixSpeed] = useState(33);
    const [matrixColor, setMatrixColor] = useState('#0f0');

    // Starfield props
    const [starCount, setStarCount] = useState(400);
    const [starSpeed, setStarSpeed] = useState(4);

    // Image Slider props
    const [sliderInterval, setSliderInterval] = useState(5000);

    // Stats
    const [screensaverStops, setScreensaverStops] = useState(0);

    // Get component and props based on selection
    const getScreensaverConfig = () => {
        switch (screensaverType) {
            case 'simple':
                return { component: SimpleTestScreensaver, props: {} };
            case 'slider':
                return {
                    component: ImageSliderScreensaver,
                    props: { images: sampleImages, interval: sliderInterval },
                };
            case 'matrix':
                return {
                    component: MatrixScreensaver,
                    props: {
                        characters: matrixChars,
                        fontSize: matrixFontSize,
                        speed: matrixSpeed,
                        color: matrixColor,
                    },
                };
            case 'starfield':
                return {
                    component: StarfieldScreensaver,
                    props: { starCount, speed: starSpeed },
                };
            case 'bouncing':
                return {
                    component: BouncingScreensaver,
                    props: { customText: bouncingText },
                };
            default:
                return { component: BouncingScreensaver, props: {} };
        }
    };

    const { component: ScreensaverComponent, props: componentProps } = getScreensaverConfig();

    return (
        <ScreensaverManager
            component={ScreensaverComponent}
            componentProps={componentProps}
            timeout={timeout}
            active={active}
            zIndex={zIndex}
            debug={debug}
            onScreenSaverStop={() => setScreensaverStops((prev) => prev + 1)}>
            {/* Sidebar Toggle */}
            <button
                className='sidebar-toggle'
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label='Toggle Sidebar'>
                {sidebarOpen ? '✕' : '☰'}
            </button>

            {/* Theme Toggle */}
            <button className='theme-toggle' onClick={toggleTheme} aria-label='Toggle Theme'>
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className='sidebar-header'>
                    <h3>📑 Navigation</h3>
                </div>
                <nav className='sidebar-nav'>
                    <a href='#installation' className='nav-item'>
                        📥 Installation
                    </a>
                    <a href='#quick-start' className='nav-item'>
                        🚀 Quick Start
                    </a>
                    <a href='#demo' className='nav-item'>
                        🎮 Live Demo
                    </a>
                    <a href='#api' className='nav-item'>
                        📚 API Reference
                    </a>
                </nav>
                <div className='sidebar-footer'>
                    <a
                        href='https://github.com/farisnceit/react-idle-screensaver'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='sidebar-link'>
                        📦 GitHub
                    </a>
                    <a
                        href='https://www.npmjs.com/package/@mohamedfariz/react-idle-screensaver'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='sidebar-link'>
                        📚 NPM
                    </a>
                </div>
            </aside>

            <div className='app-container'>
                <header className='app-header'>
                    <h1>⚡ React Idle Screensaver</h1>
                    <p className='subtitle'>
                        A lightweight React component for detecting user inactivity and displaying
                        customizable screensavers
                    </p>
                    <div className='header-badges'>
                        <span className='badge'>📦 9.5 KB</span>
                        <span className='badge'>⚡ 60 FPS</span>
                        <span className='badge'>🎨 5 Screensavers</span>
                        <span className='badge'>📱 Mobile Ready</span>
                    </div>
                </header>

                {/* Installation Section */}
                <section id='installation' className='section installation-section'>
                    <h2>📥 Installation</h2>
                    <div className='code-block-wrapper'>
                        <div className='code-block'>
                            <div className='code-header'>
                                <span>npm</span>
                                <button
                                    className='copy-btn'
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            'npm install @mohamedfariz/react-idle-screensaver',
                                        )
                                    }>
                                    📋 Copy
                                </button>
                            </div>
                            <code>npm install @mohamedfariz/react-idle-screensaver</code>
                        </div>
                        <div className='code-block'>
                            <div className='code-header'>
                                <span>yarn</span>
                                <button
                                    className='copy-btn'
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            'yarn add @mohamedfariz/react-idle-screensaver',
                                        )
                                    }>
                                    📋 Copy
                                </button>
                            </div>
                            <code>yarn add @mohamedfariz/react-idle-screensaver</code>
                        </div>
                        <div className='code-block'>
                            <div className='code-header'>
                                <span>pnpm</span>
                                <button
                                    className='copy-btn'
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            'pnpm add @mohamedfariz/react-idle-screensaver',
                                        )
                                    }>
                                    📋 Copy
                                </button>
                            </div>
                            <code>pnpm add @mohamedfariz/react-idle-screensaver</code>
                        </div>
                    </div>
                </section>

                {/* Quick Start */}
                <section id='quick-start' className='section quick-start-section'>
                    <h2>🚀 Quick Start</h2>
                    <div className='code-example'>
                        <pre>{`import { ScreensaverManager, BouncingScreensaver } from '@mohamedfariz/react-idle-screensaver'
import '@mohamedfariz/react-idle-screensaver/style.css'

function App() {
  return (
    <ScreensaverManager
      component={BouncingScreensaver}
      componentProps={{ customText: 'System Standby' }}
      timeout={5000}
    >
      <YourApp />
    </ScreensaverManager>
  )
}`}</pre>
                    </div>
                </section>

                {/* Live Demo Controls */}
                <section id='demo' className='section demo-section'>
                    <h2>🎮 Live Demo & Configuration</h2>
                    <p className='section-description'>
                        Try different screensavers and adjust their properties in real-time. Stop interacting
                        for {timeout / 1000} seconds to see the screensaver.
                    </p>

                    <div className='demo-grid'>
                        {/* Screensaver Selection */}
                        <div className='demo-panel'>
                            <h3>🎨 Screensaver Type</h3>
                            <div className='screensaver-grid'>
                                {[
                                    { id: 'simple', name: 'Simple Test', emoji: '📝' },
                                    { id: 'bouncing', name: 'Bouncing', emoji: '⚽' },
                                    { id: 'slider', name: 'Image Slider', emoji: '🖼️' },
                                    { id: 'matrix', name: 'Matrix', emoji: '💚' },
                                    { id: 'starfield', name: 'Starfield', emoji: '⭐' },
                                ].map((ss) => (
                                    <button
                                        key={ss.id}
                                        className={`screensaver-card ${screensaverType === ss.id ? 'active' : ''}`}
                                        onClick={() => setScreensaverType(ss.id as ScreensaverType)}>
                                        <span className='emoji'>{ss.emoji}</span>
                                        <span className='name'>{ss.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Core Props */}
                        <div className='demo-panel'>
                            <h3>⚙️ Core Props</h3>
                            <div className='control-group'>
                                <label>
                                    <span className='label-text'>timeout</span>
                                    <span className='label-value'>
                                        {timeout}ms ({timeout / 1000}s)
                                    </span>
                                </label>
                                <input
                                    type='range'
                                    min='2000'
                                    max='30000'
                                    step='1000'
                                    value={timeout}
                                    onChange={(e) => setTimeout(Number(e.target.value))}
                                    className='slider'
                                />
                                <p className='hint'>Time in milliseconds before screensaver activates</p>
                            </div>

                            <div className='control-group'>
                                <label>
                                    <span className='label-text'>zIndex</span>
                                    <span className='label-value'>{zIndex}</span>
                                </label>
                                <input
                                    type='range'
                                    min='1000'
                                    max='99999'
                                    step='1000'
                                    value={zIndex}
                                    onChange={(e) => setZIndex(Number(e.target.value))}
                                    className='slider'
                                />
                                <p className='hint'>Z-index of the screensaver overlay</p>
                            </div>

                            <div className='control-group'>
                                <label className='checkbox-label'>
                                    <input
                                        type='checkbox'
                                        checked={active}
                                        onChange={(e) => setActive(e.target.checked)}
                                    />
                                    <span>active</span>
                                </label>
                                <p className='hint'>Enable/disable the screensaver</p>
                            </div>

                            <div className='control-group'>
                                <label className='checkbox-label'>
                                    <input
                                        type='checkbox'
                                        checked={debug}
                                        onChange={(e) => setDebug(e.target.checked)}
                                    />
                                    <span>debug</span>
                                </label>
                                <p className='hint'>Show debug logs in console</p>
                            </div>
                        </div>

                        {/* Component-Specific Props */}
                        <div className='demo-panel full-width'>
                            <h3>
                                🎛️ Component Props for{' '}
                                {screensaverType.charAt(0).toUpperCase() + screensaverType.slice(1)}
                            </h3>

                            {screensaverType === 'bouncing' && (
                                <div className='props-grid'>
                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>customText</span>
                                        </label>
                                        <input
                                            type='text'
                                            value={bouncingText}
                                            onChange={(e) => setBouncingText(e.target.value)}
                                            className='text-input'
                                            placeholder='Enter custom text'
                                        />
                                        <p className='hint'>Text to display in the bouncing element</p>
                                    </div>
                                </div>
                            )}

                            {screensaverType === 'matrix' && (
                                <div className='props-grid'>
                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>characters</span>
                                        </label>
                                        <input
                                            type='text'
                                            value={matrixChars}
                                            onChange={(e) => setMatrixChars(e.target.value)}
                                            className='text-input'
                                        />
                                        <p className='hint'>Characters to display in the matrix effect</p>
                                    </div>

                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>fontSize</span>
                                            <span className='label-value'>{matrixFontSize}px</span>
                                        </label>
                                        <input
                                            type='range'
                                            min='10'
                                            max='30'
                                            value={matrixFontSize}
                                            onChange={(e) => setMatrixFontSize(Number(e.target.value))}
                                            className='slider'
                                        />
                                    </div>

                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>speed</span>
                                            <span className='label-value'>{matrixSpeed}ms</span>
                                        </label>
                                        <input
                                            type='range'
                                            min='10'
                                            max='100'
                                            value={matrixSpeed}
                                            onChange={(e) => setMatrixSpeed(Number(e.target.value))}
                                            className='slider'
                                        />
                                        <p className='hint'>Lower = faster animation</p>
                                    </div>

                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>color</span>
                                            <span className='label-value'>{matrixColor}</span>
                                        </label>
                                        <input
                                            type='color'
                                            value={matrixColor}
                                            onChange={(e) => setMatrixColor(e.target.value)}
                                            className='color-input'
                                        />
                                    </div>
                                </div>
                            )}

                            {screensaverType === 'starfield' && (
                                <div className='props-grid'>
                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>starCount</span>
                                            <span className='label-value'>{starCount}</span>
                                        </label>
                                        <input
                                            type='range'
                                            min='50'
                                            max='1000'
                                            step='50'
                                            value={starCount}
                                            onChange={(e) => setStarCount(Number(e.target.value))}
                                            className='slider'
                                        />
                                        <p className='hint'>Number of stars to display</p>
                                    </div>

                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>speed</span>
                                            <span className='label-value'>{starSpeed}</span>
                                        </label>
                                        <input
                                            type='range'
                                            min='1'
                                            max='10'
                                            value={starSpeed}
                                            onChange={(e) => setStarSpeed(Number(e.target.value))}
                                            className='slider'
                                        />
                                        <p className='hint'>Speed of star movement</p>
                                    </div>
                                </div>
                            )}

                            {screensaverType === 'slider' && (
                                <div className='props-grid'>
                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>interval</span>
                                            <span className='label-value'>
                                                {sliderInterval}ms ({sliderInterval / 1000}s)
                                            </span>
                                        </label>
                                        <input
                                            type='range'
                                            min='2000'
                                            max='10000'
                                            step='1000'
                                            value={sliderInterval}
                                            onChange={(e) => setSliderInterval(Number(e.target.value))}
                                            className='slider'
                                        />
                                        <p className='hint'>Time between image transitions</p>
                                    </div>

                                    <div className='control-group'>
                                        <label>
                                            <span className='label-text'>images</span>
                                        </label>
                                        <p className='hint'>
                                            Array of image URLs (currently using {sampleImages.length} sample
                                            images)
                                        </p>
                                    </div>
                                </div>
                            )}

                            {screensaverType === 'simple' && (
                                <div className='props-grid'>
                                    <p className='hint'>This screensaver has no configurable props</p>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className='demo-panel'>
                            <h3>📊 Statistics</h3>
                            <div className='stats-grid'>
                                <div className='stat-item'>
                                    <span className='stat-label'>Screensaver Activations</span>
                                    <span className='stat-value'>{screensaverStops}</span>
                                </div>
                                <div className='stat-item'>
                                    <span className='stat-label'>Current Status</span>
                                    <span className={`stat-value ${active ? 'active' : 'inactive'}`}>
                                        {active ? '🟢 Active' : '🔴 Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Test Area */}
                        <div className='demo-panel'>
                            <h3>🎯 Test Area</h3>
                            <p className='hint'>
                                Interact here, then stop for {timeout / 1000}s to trigger the screensaver
                            </p>
                            <div className='test-zone'>
                                <input type='text' placeholder='Type here...' className='text-input' />
                                <button className='test-button'>Click Me</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* API Reference */}
                <section id='api' className='section api-section'>
                    <h2>📚 API Reference</h2>

                    <div className='api-table-wrapper'>
                        <h3>ScreensaverManager Props</h3>
                        <table className='api-table'>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>component</code>
                                    </td>
                                    <td>
                                        <code>React.ComponentType</code>
                                    </td>
                                    <td>
                                        <em>required</em>
                                    </td>
                                    <td>The screensaver component to render</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>componentProps</code>
                                    </td>
                                    <td>
                                        <code>object</code>
                                    </td>
                                    <td>
                                        <code>{'{}'}</code>
                                    </td>
                                    <td>Props to pass to the screensaver component</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>timeout</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>5000</code>
                                    </td>
                                    <td>Idle timeout in milliseconds</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>active</code>
                                    </td>
                                    <td>
                                        <code>boolean</code>
                                    </td>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>Enable/disable the screensaver</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>zIndex</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>9999</code>
                                    </td>
                                    <td>Z-index of the screensaver overlay</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>debug</code>
                                    </td>
                                    <td>
                                        <code>boolean</code>
                                    </td>
                                    <td>
                                        <code>false</code>
                                    </td>
                                    <td>Enable debug logging</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>onScreenSaverStop</code>
                                    </td>
                                    <td>
                                        <code>() =&gt; void</code>
                                    </td>
                                    <td>
                                        <code>undefined</code>
                                    </td>
                                    <td>Callback when screensaver is dismissed</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='api-table-wrapper'>
                        <h3>Screensaver Components Props</h3>

                        <h4>BouncingScreensaver</h4>
                        <table className='api-table'>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>customText</code>
                                    </td>
                                    <td>
                                        <code>string</code>
                                    </td>
                                    <td>
                                        <code>"System Standby"</code>
                                    </td>
                                    <td>Text to display</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>MatrixScreensaver</h4>
                        <table className='api-table'>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>characters</code>
                                    </td>
                                    <td>
                                        <code>string</code>
                                    </td>
                                    <td>
                                        <code>"01アイウエオ..."</code>
                                    </td>
                                    <td>Characters to display</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>fontSize</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>14</code>
                                    </td>
                                    <td>Font size in pixels</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>speed</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>33</code>
                                    </td>
                                    <td>Animation speed (lower = faster)</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>color</code>
                                    </td>
                                    <td>
                                        <code>string</code>
                                    </td>
                                    <td>
                                        <code>"#0f0"</code>
                                    </td>
                                    <td>Matrix color</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>StarfieldScreensaver</h4>
                        <table className='api-table'>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>starCount</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>400</code>
                                    </td>
                                    <td>Number of stars</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>speed</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>4</code>
                                    </td>
                                    <td>Star movement speed</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>ImageSliderScreensaver</h4>
                        <table className='api-table'>
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <code>images</code>
                                    </td>
                                    <td>
                                        <code>string[]</code>
                                    </td>
                                    <td>
                                        <em>required</em>
                                    </td>
                                    <td>Array of image URLs</td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>interval</code>
                                    </td>
                                    <td>
                                        <code>number</code>
                                    </td>
                                    <td>
                                        <code>5000</code>
                                    </td>
                                    <td>Time between slides (ms)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer className='app-footer'>
                    <p>
                        Made with ❤️ by{' '}
                        <a href='https://farizbytes.com' target='_blank' rel='noopener noreferrer'>
                            FarizBytes
                        </a>
                    </p>
                    <p className='small'>
                        <a
                            href='https://github.com/farisnceit/react-idle-screensaver'
                            target='_blank'
                            rel='noopener noreferrer'>
                            📦 View on GitHub
                        </a>
                        {' • '}
                        <a
                            href='https://www.npmjs.com/package/@mohamedfariz/react-idle-screensaver'
                            target='_blank'
                            rel='noopener noreferrer'>
                            📚 View on NPM
                        </a>
                    </p>
                </footer>
            </div>
        </ScreensaverManager>
    );
}

export default App;
