# Contributing to @farizbytes/react-idle-screensaver

Thank you for your interest in contributing to react-idle-screensaver! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
    ```bash
    git clone https://github.com/YOUR-USERNAME/react-idle-screensaver.git
    cd react-idle-screensaver
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```

## Development Workflow

### Building the Library

```bash
# Build types and JavaScript
npm run build

# Watch mode for development
npm run watch
```

### Linting

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Testing Your Changes

Before submitting a PR, ensure:

- The project builds successfully: `npm run build`
- No linting errors: `npm run lint`
- Types are correctly generated in `dist/types/`

## Coding Standards

- Use **TypeScript** for all code
- Follow existing code style and conventions
- Use **meaningful variable and function names**
- Add **JSDoc comments** for exported functions and components
- Ensure **React 18+ and React 19 compatibility**

## Submitting Changes

1. **Create a new branch** for your feature/fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make your changes** and commit with clear messages:

    ```bash
    git commit -m "feat: add new feature description"
    ```

3. **Push to your fork**:

    ```bash
    git push origin feature/your-feature-name
    ```

4. **Open a Pull Request** on GitHub with:
    - Clear description of changes
    - Reference to any related issues
    - Screenshots/demos if applicable

## Commit Message Convention

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Reporting Issues

- Use GitHub Issues to report bugs or request features
- Provide a clear description and reproduction steps
- Include relevant environment details (React version, browser, etc.)

## Questions?

Feel free to reach out to the maintainer:

- Email: faris872010@gmail.com
- Website: https://farizbytes.com/contact

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
