import { useState } from 'react'
import {
    ScreensaverManager,
    SimpleTestScreensaver,
    ImageSliderScreensaver,
    MatrixScreensaver,
    StarfieldScreensaver,
    BouncingScreensaver,
} from '@farizbytes/react-idle-screensaver'
import './App.css'

const screensavers = [
    { name: 'Simple Test', component: SimpleTestScreensaver },
    { name: 'Image Slider', component: ImageSliderScreensaver },
    { name: 'Matrix', component: MatrixScreensaver },
    { name: 'Starfield', component: StarfieldScreensaver },
    { name: 'Bouncing', component: BouncingScreensaver },
]

const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920',
]

function App() {
    const [selectedScreensaver, setSelectedScreensaver] = useState(0)
    const [timeout, setTimeout] = useState(5000)
    const [debug, setDebug] = useState(true)
    const [eventCount, setEventCount] = useState(0)
    const [lastEvent, setLastEvent] = useState('')

    const ScreensaverComponent = screensavers[selectedScreensaver].component
    const componentProps = selectedScreensaver === 1 ? { images: sampleImages } : {}

    const handleActivity = (eventType: string) => {
        setEventCount(prev => prev + 1)
        setLastEvent(eventType)
    }

    return (
        <ScreensaverManager
            component={ScreensaverComponent}
            componentProps={componentProps}
            timeout={timeout}
            debug={debug}
            onScreenSaverStop={() => handleActivity('Screensaver Dismissed')}
        >
            <div className="app-container">
                <header className="app-header">
                    <h1>🎉 React Idle Screensaver - Blinking Fix Test</h1>
                    <p className="subtitle">Testing the fixes for the blinking/flickering issue</p>
                </header>

                <div className="content-grid">
                    {/* Status Panel */}
                    <div className="panel status-panel">
                        <h2>📊 Status Monitor</h2>
                        <div className="status-grid">
                            <div className="status-item">
                                <span className="label">Debug Mode:</span>
                                <span className={`value ${debug ? 'active' : 'inactive'}`}>
                                    {debug ? '✅ Enabled' : '❌ Disabled'}
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="label">Timeout:</span>
                                <span className="value">{timeout / 1000}s</span>
                            </div>
                            <div className="status-item">
                                <span className="label">Activity Events:</span>
                                <span className="value">{eventCount}</span>
                            </div>
                            <div className="status-item">
                                <span className="label">Last Event:</span>
                                <span className="value">{lastEvent || 'None'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls Panel */}
                    <div className="panel controls-panel">
                        <h2>⚙️ Controls</h2>

                        <div className="control-group">
                            <label htmlFor="screensaver-select">Screensaver Type:</label>
                            <select
                                id="screensaver-select"
                                value={selectedScreensaver}
                                onChange={(e) => setSelectedScreensaver(Number(e.target.value))}
                                className="select-input"
                            >
                                {screensavers.map((ss, index) => (
                                    <option key={index} value={index}>
                                        {ss.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="control-group">
                            <label htmlFor="timeout-slider">
                                Idle Timeout: {timeout / 1000}s
                            </label>
                            <input
                                id="timeout-slider"
                                type="range"
                                min="3000"
                                max="30000"
                                step="1000"
                                value={timeout}
                                onChange={(e) => setTimeout(Number(e.target.value))}
                                className="slider-input"
                            />
                        </div>

                        <div className="control-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={debug}
                                    onChange={(e) => setDebug(e.target.checked)}
                                />
                                <span>Enable Debug Mode (check console)</span>
                            </label>
                        </div>
                    </div>

                    {/* Instructions Panel */}
                    <div className="panel instructions-panel">
                        <h2>📋 Test Instructions</h2>
                        <ol className="instructions-list">
                            <li>
                                <strong>Wait for idle:</strong> Stop moving your mouse for {timeout / 1000} seconds
                            </li>
                            <li>
                                <strong>Observe:</strong> The screensaver should appear smoothly without blinking
                            </li>
                            <li>
                                <strong>Dismiss:</strong> Move your mouse or press any key
                            </li>
                            <li>
                                <strong>Check console:</strong> With debug enabled, you should NOT see repeated "Cleaning up" messages
                            </li>
                            <li>
                                <strong>Repeat:</strong> Test multiple times to ensure no flickering
                            </li>
                        </ol>
                    </div>

                    {/* Expected Behavior Panel */}
                    <div className="panel expected-panel">
                        <h2>✅ Expected Behavior</h2>
                        <div className="behavior-list">
                            <div className="behavior-item success">
                                <span className="icon">✅</span>
                                <span>Screensaver appears smoothly after timeout</span>
                            </div>
                            <div className="behavior-item success">
                                <span className="icon">✅</span>
                                <span>No blinking or flickering</span>
                            </div>
                            <div className="behavior-item success">
                                <span className="icon">✅</span>
                                <span>Dismisses immediately on activity</span>
                            </div>
                            <div className="behavior-item success">
                                <span className="icon">✅</span>
                                <span>No "Cleaning up" spam in console</span>
                            </div>
                            <div className="behavior-item error">
                                <span className="icon">❌</span>
                                <span>Rapid idle/active state changes</span>
                            </div>
                            <div className="behavior-item error">
                                <span className="icon">❌</span>
                                <span>Event listener re-initialization loops</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Test Area */}
                    <div className="panel test-area-panel">
                        <h2>🎯 Interactive Test Area</h2>
                        <p className="test-description">
                            Move your mouse around this area, type in the input, or click the buttons to generate activity.
                            Then stop all activity and wait for the screensaver.
                        </p>

                        <div className="test-controls">
                            <input
                                type="text"
                                placeholder="Type here to test activity detection..."
                                className="test-input"
                                onKeyDown={() => handleActivity('Keyboard Input')}
                            />

                            <div className="button-group">
                                <button
                                    onClick={() => handleActivity('Button Click')}
                                    className="test-button primary"
                                >
                                    Click Me
                                </button>
                                <button
                                    onClick={() => {
                                        setEventCount(0)
                                        setLastEvent('')
                                    }}
                                    className="test-button secondary"
                                >
                                    Reset Counter
                                </button>
                            </div>
                        </div>

                        <div className="activity-zone">
                            <p>🖱️ Mouse Activity Zone</p>
                            <p className="small">Move your mouse here to trigger activity</p>
                        </div>
                    </div>

                    {/* Fix Summary Panel */}
                    <div className="panel fix-summary-panel">
                        <h2>🔧 Fixes Applied</h2>
                        <div className="fix-list">
                            <div className="fix-item">
                                <strong>1. Removed Rogue Element</strong>
                                <p>Eliminated accidental &lt;h1&gt;Ge&lt;/h1&gt; causing rendering issues</p>
                            </div>
                            <div className="fix-item">
                                <strong>2. Fixed Dependencies</strong>
                                <p>Added eventsList to useEffect dependency array</p>
                            </div>
                            <div className="fix-item">
                                <strong>3. Memoized Events</strong>
                                <p>Prevented events array recreation on every render</p>
                            </div>
                            <div className="fix-item">
                                <strong>4. Stabilized Callbacks</strong>
                                <p>Used refs and useCallback to prevent infinite loops</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="app-footer">
                    <p>
                        📖 Check the console (F12) for debug logs when debug mode is enabled
                    </p>
                    <p className="small">
                        Package: @farizbytes/react-idle-screensaver v0.1.0
                    </p>
                </footer>
            </div>
        </ScreensaverManager>
    )
}

export default App
