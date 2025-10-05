# 🏗️ Project Structure - TaskFlow

This documentation details the organization and architecture of TaskFlow's code, helping developers understand and contribute to the project.

## 📁 General Structure

```
taskflow/
├── 📂 public/              # Public static files
│   ├── favicon.ico        # Application icon
│   ├── robots.txt         # Bot configuration
│   └── manifest.json      # PWA manifest
├── 📂 src/                # Main source code
│   ├── 📂 components/     # React components
│   ├── 📂 hooks/         # Custom hooks
│   ├── 📂 utils/         # Utilities and helpers
│   ├── 📂 types/         # TypeScript definitions
│   ├── 📂 contexts/      # React contexts
│   ├── 📂 services/      # Services and APIs
│   ├── 📂 styles/        # Global styles
│   ├── 📂 test/          # Test configurations
│   ├── 📂 assets/        # Static resources
│   ├── App.tsx           # Main component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── 📂 docs/              # Documentation
├── 📂 .github/           # GitHub configurations
│   ├── workflows/        # GitHub Actions
│   └── ISSUE_TEMPLATE/   # Issue templates
├── 📄 package.json       # Dependencies and scripts
├── 📄 vite.config.ts     # Vite configuration
├── 📄 tsconfig.json      # TypeScript configuration
└── 📄 README.md          # Main documentation
```

## 🔧 Configuration Files

### `package.json`
```json
{
  "name": "taskflow",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit"
  }
}
```

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## 📂 Detailed `src/` Structure

### `components/`
```
components/
├── 📂 ui/                 # Base UI components (Button, Input, etc.)
│   ├── Button.tsx        # Reusable button
│   ├── Input.tsx         # Input field
│   ├── Modal.tsx         # Generic modal
│   └── ...
├── 📂 layout/            # Layout and navigation
│   ├── Header.tsx        # Application header
│   ├── Sidebar.tsx       # Sidebar
│   ├── Footer.tsx        # Footer
│   └── ...
├── 📂 tasks/             # Task-specific components
│   ├── TaskCard.tsx      # Task card
│   ├── TaskForm.tsx      # Task form
│   ├── TaskList.tsx      # Task list
│   └── ...
├── 📂 dashboard/         # Dashboard components
│   ├── StatsCard.tsx     # Statistics card
│   ├── Charts.tsx        # Charts
│   └── ...
└── 📂 common/            # Shared components
    ├── Loading.tsx       # Loading indicator
    ├── ErrorBoundary.tsx # Error handling
    └── EmptyState.tsx    # Empty state
```

### `hooks/`
```
hooks/
├── 📂 tasks/             # Task-related hooks
│   ├── useTasks.ts       # Task management
│   ├── useTaskFilters.ts # Task filters
│   └── useTaskStats.ts   # Task statistics
├── 📂 ui/                # UI hooks
│   ├── useLocalStorage.ts # Local persistence
│   ├── useTheme.ts       # Theme management
│   └── useKeyboard.ts    # Keyboard shortcuts
├── 📂 api/               # API hooks
│   ├── useApi.ts         # HTTP client
│   └── useSync.ts        # Synchronization
└── 📂 common/            # Utility hooks
    ├── useDebounce.ts    # Debounce
    ├── useAsync.ts       # Async operations
    └── usePrevious.ts    # Previous value
```

### `utils/`
```
utils/
├── 📂 date/              # Date utilities
│   ├── formatDate.ts     # Date formatting
│   ├── dateUtils.ts      # Date functions
│   └── timezones.ts      # Time zones
├── 📂 validation/        # Validation
│   ├── taskValidation.ts # Task validation
│   ├── formValidation.ts # Form validation
│   └── inputValidation.ts # Input validation
├── 📂 storage/           # Storage
│   ├── localStorage.ts   # localStorage wrapper
│   ├── sessionStorage.ts # sessionStorage wrapper
│   └── indexedDB.ts      # IndexedDB utilities
├── 📂 export/            # Export
│   ├── jsonExport.ts     # JSON export
│   ├── csvExport.ts      # CSV export
│   └── pdfExport.ts      # PDF export
└── 📂 constants/         # Constants
    ├── themes.ts         # Available themes
    ├── priorities.ts     # Priorities
    └── defaults.ts       # Default values
```

### `types/`
```
types/
├── 📂 api/               # API types
│   ├── responses.ts      # API responses
│   ├── requests.ts       # API requests
│   └── endpoints.ts      # Endpoints
├── 📂 components/        # Component props
│   ├── TaskCardProps.ts  # TaskCard props
│   ├── FormProps.ts      # Form props
│   └── ModalProps.ts     # Modal props
├── 📂 models/            # Data models
│   ├── Task.ts           # Task model
│   ├── User.ts           # User model
│   └── Settings.ts       # Settings model
└── 📂 common/            # Common types
    ├── Status.ts         # Application status
    ├── Priority.ts       # Priorities
    └── Theme.ts          # Themes
```

### `contexts/`
```
contexts/
├── 📂 app/               # Main contexts
│   ├── AppContext.tsx    # Main context
│   └── AppProvider.tsx   # Main provider
├── 📂 tasks/             # Task contexts
│   ├── TasksContext.tsx  # Task context
│   └── TasksProvider.tsx # Task provider
├── 📂 ui/                # UI contexts
│   ├── ThemeContext.tsx  # Theme context
│   ├── ModalContext.tsx  # Modal context
│   └── NotificationContext.tsx # Notification context
└── 📂 auth/              # Authentication contexts
    ├── AuthContext.tsx   # Auth context
    └── AuthProvider.tsx  # Auth provider
```

### `services/`
```
services/
├── 📂 api/               # API services
│   ├── taskService.ts    # Task API
│   ├── userService.ts    # User API
│   └── syncService.ts    # Sync API
├── 📂 storage/           # Storage services
│   ├── localStorageService.ts # localStorage service
│   ├── indexedDBService.ts    # IndexedDB service
│   └── cloudStorageService.ts # Cloud service
├── 📂 notifications/     # Notification services
│   ├── browserNotification.ts # Browser notifications
│   ├── desktopNotification.ts # Desktop notifications
│   └── emailNotification.ts   # Email notifications
└── 📂 utils/             # Utility services
    ├── exportService.ts  # Export service
    ├── importService.ts  # Import service
    └── backupService.ts  # Backup service
```

## 🏛️ Application Architecture

### Architecture Pattern
TaskFlow follows an architecture based on **components** with clear separation of responsibilities:

- **Components:** User interface (presentational)
- **Hooks:** Business logic and state (business logic)
- **Services:** External communication (external communication)
- **Utils:** Helper functions (utilities)
- **Types:** Type definitions (type definitions)

### Data Flow
```
User Action → Component → Hook → Service → External API
                      ↓
                Context Update → Component Re-render
```

### State Management
- **Local State:** useState for local component state
- **Global State:** Context API for shared state
- **Server State:** React Query/SWR for server data
- **Persistent State:** localStorage/IndexedDB for persistence

## 🎨 Design Patterns

### Components
- **Functional Components** with hooks
- **TypeScript** for type safety
- **Styled Components** or CSS Modules
- **Compound Components** for complex components

### Hooks
- **Custom Hooks** for reusable logic
- **useEffect** for side effects
- **useCallback/useMemo** for optimization
- **Error Boundaries** for error handling

### Styling
- **Tailwind CSS** for utility styling
- **CSS Variables** for themes
- **Responsive Design** with mobile-first
- **Dark Mode** support

## 🧪 Testing Structure

```
src/
├── 📂 __tests__/        # Unit tests
│   ├── components/      # Component tests
│   ├── hooks/          # Hook tests
│   └── utils/          # Utility tests
├── 📂 __tests__/integration/  # Integration tests
├── 📂 __tests__/e2e/    # End-to-end tests
└── 📂 test/            # Test configurations
    ├── setup.ts        # Vitest setup
    ├── utils.ts        # Test utilities
    └── mocks/          # Test mocks
```

## 🚀 Build and Deploy

### Build Process
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Build Structure
```
dist/
├── 📂 assets/           # Optimized resources
│   ├── index-[hash].css # Minified CSS
│   ├── index-[hash].js  # JS bundle
│   └── ...
├── index.html          # Main HTML
├── manifest.json       # PWA manifest
└── robots.txt          # SEO
```

### GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v4
```

## 📋 Code Conventions

### Naming
- **Components:** PascalCase (TaskCard, UserProfile)
- **Hooks:** camelCase with use prefix (useTasks, useTheme)
- **Utils:** camelCase (formatDate, validateEmail)
- **Types:** PascalCase (Task, UserSettings)
- **Files:** PascalCase for components, camelCase for others

### Commit Structure
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(tasks): add task filtering
- fix(ui): resolve mobile layout overflow issue
- docs(readme): update installation instructions
- refactor(utils): optimize date formatting functions
- test(tasks): add unit tests for task validation
- chore(deps): update React to version 18.2.0
```

### Code Quality
- **ESLint** for linting
- **Prettier** for formatting
- **TypeScript** for type checking
- **Husky** for pre-commit hooks
- **Commitlint** for conventional commits

---

## 🤝 Contributing

To contribute to the project:

1. **Understand the structure** described above
2. **Follow established conventions**
3. **Add tests** for new features
4. **Update documentation** as needed
5. **Submit a Pull Request** following the contributing guide

For more details, consult the [Contributing Guide](contributing.md).
