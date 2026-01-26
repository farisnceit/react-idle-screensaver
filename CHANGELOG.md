# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.6] - 2026-01-26

### Removed

- Removed unnecessary `tslib` dependency (not needed without `importHelpers` option)

## [0.2.5] - 2026-01-25

### Added

- Live interactive demo link (CodeSandbox) in README
- Direct access to try all screensaver features in browser

### Changed

- Enhanced README with prominent demo section for easier testing

## [0.2.4] - 2026-01-25

### Added

- UMD build format for CDN usage (`dist/index.umd.js`)
- Global variable `ReactIdleScreensaver` for browser environments
- lucide-react CDN dependency documentation for BouncingScreensaver support

### Changed

- Updated rollup configuration to include UMD output format
- Enhanced CDN examples to include lucide-react dependency
- Updated CDN HTML example with proper lucide-react script tag

### Fixed

- CDN usage now properly exports all components and hooks via `window.ReactIdleScreensaver`
- Proper external dependency configuration for UMD build (React, ReactDOM, lucide-react)

## [0.2.3] - 2026-01-25

### Added

- CDN installation support via unpkg and jsDelivr
- Complete CDN usage example with vanilla HTML
- Comprehensive API documentation for all built-in screensaver components
- Detailed props tables for BouncingScreensaver, MatrixScreensaver, ImageSliderScreensaver, and StarfieldScreensaver
- Four complete usage examples covering different scenarios
- Advanced useIdleTimer hook documentation with examples
- Troubleshooting section with common issues and solutions
- Extended use cases documentation
- Performance optimization guidelines
- Memory management documentation

### Changed

- License changed from ISC to MIT
- README completely restructured for better clarity and usability
- Enhanced documentation with detailed prop descriptions and default values
- Improved examples with real-world scenarios
- Better organized sections with clear navigation

### Improved

- Documentation now includes step-by-step quick start guide
- Added examples for custom screensavers with TypeScript typing
- Enhanced troubleshooting with specific solutions for common problems
- Better coverage of browser-only limitations and SSR considerations

## [0.2.0] - 2025-01-25

### Changed

- Released as stable version (removed beta tag)
- Verified all features are production-ready
- Updated documentation to reflect stable status

## [0.1.0] - 2025-01-23

### Added

- Initial release of @mohamedfariz/react-idle-screensaver
- `ScreensaverManager` component for detecting user inactivity
- `useIdleTimer` hook for programmatic idle detection
- Customizable idle timeout configuration
- Support for custom screensaver content
- Built-in screensavers:
    - BouncingScreensaver
    - ImageSliderScreensaver
    - MatrixScreensaver
    - StarfieldScreensaver
    - SimpleTestScreensaver
- TypeScript type definitions
- ESM and CJS module support
- CSS styling support with modular stylesheets
- React 18+ and React 19 compatibility
- Integration with lucide-react icons

### Features

- Lightweight and performant idle detection
- Fully typed with TypeScript
- Context-based state management with ScreensaverContext
- Ideal for kiosks, dashboards, TVs, and unattended applications
- Customizable appearance and behavior
- Debug mode for development

[0.2.4]: https://github.com/farisnceit/react-idle-screensaver/releases/tag/v0.2.4
[0.2.3]: https://github.com/farisnceit/react-idle-screensaver/releases/tag/v0.2.3
[0.2.0]: https://github.com/farisnceit/react-idle-screensaver/releases/tag/v0.2.0
[0.1.0]: https://github.com/farisnceit/react-idle-screensaver/releases/tag/v0.1.0
