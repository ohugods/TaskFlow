# Installation Guide

This guide will help you install and configure TaskFlow in your development environment.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** 18.x or higher
- **npm** (comes with Node.js) or **yarn**
- **Git** to clone the repository

### Checking Installations

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ohugods/TaskFlow.git
cd TaskFlow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

```bash
npm run dev
```

The project will be available at [http://localhost:5173](http://localhost:5173).

## 🔧 Additional Configuration

### Environment Variables

Create a `.env` file in the project root if needed:

```env
VITE_APP_TITLE=TaskFlow
VITE_APP_VERSION=1.0.0
```

### Editor Configuration

We recommend using VS Code with the following extensions:

- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

## 🐛 Troubleshooting

### Common Issues

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port already in use"**
```bash
npm run dev -- --port 3000
```

**TypeScript Error**
```bash
npm run type-check
```

## 📚 Next Steps

After successful installation:

1. Read the [Quick Start Guide](quick-start.md)
2. Explore the [Features](../user-guide/features.md)
3. Check the [Project Structure](../developer/project-structure.md)

## 🤝 Support

If you encounter issues during installation:

1. Verify all prerequisites are installed
2. Check the troubleshooting section above
3. Open an [issue on GitHub](https://github.com/ohugods/TaskFlow/issues)
4. Contact via [LinkedIn](https://linkedin.com/in/hugods)
