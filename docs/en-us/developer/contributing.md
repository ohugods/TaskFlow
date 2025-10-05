# Contributing Guide

Thank you for considering contributing to TaskFlow! This document provides guidelines for contributions.

## 🤝 How to Contribute

### 1. Fork the Project

1. Fork the repository
2. Clone your fork locally
3. Create a branch for your feature

```bash
git checkout -b feature/new-feature
```

### 2. Make Your Changes

- Follow code conventions
- Add tests for new features
- Keep documentation updated

### 3. Test Your Changes

```bash
npm run test
npm run lint
npm run type-check
```

### 4. Submit a Pull Request

1. Commit your changes
2. Push to your branch
3. Open a Pull Request

## 📋 Code Conventions

### TypeScript/React
- Use TypeScript for typing
- Functional components with hooks
- Well-defined props interfaces
- Descriptive variable names

### CSS/Styling
- Use Tailwind CSS
- Prefer utility classes
- Responsive design required
- Consider accessibility

### Commits
- Use conventional commits
- Messages in English
- Clear and concise descriptions

## 🧪 Testing

### Running Tests
```bash
npm run test          # Unit tests
npm run test:coverage # With coverage
npm run test:ui       # Visual interface
```

### Writing Tests
- Test behavior, not implementation
- Use React Testing Library
- Minimum 80% coverage

## 📝 Documentation

### Updating Documentation
- Keep README updated
- Document new features
- Clear code examples
- Versions in Portuguese and English

## 🐛 Reporting Bugs

### Before Reporting
1. Check if issue already exists
2. Test on latest version
3. Reproduce the problem

### Required Information
- Browser version
- Operating system
- Steps to reproduce
- Expected vs actual behavior

## ✨ Suggesting Features

### Process
1. Open an issue with "enhancement" label
2. Describe the feature
3. Explain use case
4. Consider implementation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Acknowledgments

Thank you to all contributors who help make TaskFlow better!
