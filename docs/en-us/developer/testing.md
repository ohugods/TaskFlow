# 🧪 Testing Guide - TaskFlow

This document describes the testing strategy adopted in TaskFlow, including testing types, tools used, and best practices.

## 🎯 Testing Strategy

### Testing Pyramid
```
     E2E Tests (top)
    Integration Tests (middle)
   Unit Tests (base)
```

### Test Coverage
- **Unit:** Minimum 80% coverage
- **Integration:** Key user flows
- **E2E:** Critical business scenarios

## 🛠️ Testing Tools

### Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
})
```

### Testing Library
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

### Test Utils
```typescript
// src/test/utils.tsx
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { TasksProvider } from '@/contexts/TasksContext'

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <TasksProvider>
        {children}
      </TasksProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

## 🧩 Unit Tests

### Components
```typescript
// src/components/TaskCard.test.tsx
import { render, screen, fireEvent } from '@/test/utils'
import { TaskCard } from './TaskCard'

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  priority: 'medium' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} onToggle={() => {}} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('calls onToggle when checkbox is clicked', () => {
    const mockOnToggle = jest.fn()
    render(<TaskCard task={mockTask} onToggle={mockOnToggle} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledWith('1')
  })

  it('shows completed state correctly', () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskCard task={completedTask} onToggle={() => {}} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })
})
```

### Hooks
```typescript
// src/hooks/useTasks.test.ts
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTasks } from './useTasks'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty tasks array', () => {
    const { result } = renderHook(() => useTasks())

    expect(result.current.tasks).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('adds a task successfully', async () => {
    const { result } = renderHook(() => useTasks())

    const newTask = {
      title: 'New Task',
      description: 'Task description',
      priority: 'high' as const,
    }

    act(() => {
      result.current.addTask(newTask)
    })

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(1)
    })

    expect(result.current.tasks[0]).toMatchObject(newTask)
  })

  it('handles errors when adding task', async () => {
    // Mock to simulate error
    const mockAddTask = jest.fn().mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useTasks())

    act(() => {
      // Force simulated error
    })

    await waitFor(() => {
      expect(result.current.error).toBe('API Error')
    })
  })
})
```

### Utilities
```typescript
// src/utils/dateUtils.test.ts
import { formatDate, isOverdue, getDaysUntilDue } from './dateUtils'

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date in US format', () => {
      const date = new Date(2023, 11, 25) // December 25, 2023
      expect(formatDate(date)).toBe('12/25/2023')
    })

    it('formats date with custom format', () => {
      const date = new Date(2023, 11, 25)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-12-25')
    })

    it('handles invalid dates', () => {
      expect(formatDate(new Date('invalid'))).toBe('Invalid date')
    })
  })

  describe('isOverdue', () => {
    it('returns true for past dates', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)

      expect(isOverdue(pastDate)).toBe(true)
    })

    it('returns false for future dates', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)

      expect(isOverdue(futureDate)).toBe(false)
    })

    it('returns false for today', () => {
      const today = new Date()
      expect(isOverdue(today)).toBe(false)
    })
  })

  describe('getDaysUntilDue', () => {
    it('calculates days until due date', () => {
      const today = new Date()
      const futureDate = new Date()
      futureDate.setDate(today.getDate() + 5)

      expect(getDaysUntilDue(futureDate)).toBe(5)
    })

    it('returns negative for overdue dates', () => {
      const today = new Date()
      const pastDate = new Date()
      pastDate.setDate(today.getDate() - 3)

      expect(getDaysUntilDue(pastDate)).toBe(-3)
    })
  })
})
```

## 🔗 Integration Tests

### Compound Components
```typescript
// src/components/TaskForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { TaskForm } from './TaskForm'

describe('TaskForm Integration', () => {
  it('creates a complete task with all fields', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    render(<TaskForm onSubmit={mockOnSubmit} />)

    // Fill title
    await user.type(screen.getByLabelText(/title/i), 'New Task')

    // Fill description
    await user.type(
      screen.getByLabelText(/description/i),
      'Task description'
    )

    // Select priority
    await user.selectOptions(
      screen.getByLabelText(/priority/i),
      'high'
    )

    // Set due date
    const dateInput = screen.getByLabelText(/due date/i)
    await user.type(dateInput, '2023-12-31')

    // Submit form
    await user.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Task description',
        priority: 'high',
        dueDate: expect.any(Date),
      })
    })
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    render(<TaskForm onSubmit={mockOnSubmit} />)

    // Try to submit without title
    await user.click(screen.getByRole('button', { name: /save/i }))

    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
```

### User Flows
```typescript
// src/components/TaskManager.test.tsx
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { TaskManager } from './TaskManager'

describe('TaskManager User Flows', () => {
  it('completes full task lifecycle', async () => {
    const user = userEvent.setup()

    render(<TaskManager />)

    // Create a task
    await user.click(screen.getByRole('button', { name: /new task/i }))
    await user.type(screen.getByLabelText(/title/i), 'Test Task')
    await user.click(screen.getByRole('button', { name: /save/i }))

    // Verify task was created
    expect(screen.getByText('Test Task')).toBeInTheDocument()

    // Mark as completed
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    // Verify moved to completed
    expect(screen.getByText('Test Task')).toHaveClass('completed')

    // Filter completed tasks
    await user.click(screen.getByRole('button', { name: /completed/i }))

    // Verify appears in completed filter
    expect(screen.getByText('Test Task')).toBeInTheDocument()

    // Delete the task
    await user.click(screen.getByRole('button', { name: /delete/i }))
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    // Verify removed
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
  })
})
```

## 🌐 E2E Tests

### Playwright
```typescript
// e2e/task-management.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('should create and manage a task', async ({ page }) => {
    // Navigate to application
    await page.goto('/')

    // Create new task
    await page.click('[data-testid="new-task-button"]')
    await page.fill('[data-testid="task-title"]', 'E2E Task')
    await page.fill('[data-testid="task-description"]', 'Task description')
    await page.selectOption('[data-testid="task-priority"]', 'high')
    await page.click('[data-testid="save-task"]')

    // Verify task was created
    await expect(page.locator('text=E2E Task')).toBeVisible()

    // Mark as completed
    await page.check('[data-testid="task-checkbox"]')

    // Verify visual state
    await expect(page.locator('[data-testid="task-item"]')).toHaveClass(/completed/)

    // Filter completed tasks
    await page.click('[data-testid="filter-completed"]')

    // Verify appears in filter
    await expect(page.locator('text=E2E Task')).toBeVisible()

    // Delete the task
    await page.click('[data-testid="delete-task"]')
    await page.click('[data-testid="confirm-delete"]')

    // Verify removed
    await expect(page.locator('text=E2E Task')).toBeHidden()
  })

  test('should persist data after page reload', async ({ page }) => {
    // Create task
    await page.click('[data-testid="new-task-button"]')
    await page.fill('[data-testid="task-title"]', 'Persistent Task')
    await page.click('[data-testid="save-task"]')

    // Reload page
    await page.reload()

    // Verify task still exists
    await expect(page.locator('text=Persistent Task')).toBeVisible()
  })
})
```

## 📊 Test Coverage

### Coverage Configuration
```json
{
  "coverage": {
    "reporter": ["text", "json", "html", "lcov"],
    "exclude": [
      "node_modules/",
      "src/test/",
      "**/*.d.ts",
      "**/*.config.*",
      "src/main.tsx"
    ],
    "thresholds": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Test Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

## 🎭 Mocks and Stubs

### API Mocks
```typescript
// src/test/mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/tasks', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          title: 'Mock Task',
          completed: false,
        },
      ])
    )
  }),

  rest.post('/api/tasks', async (req, res, ctx) => {
    const { title } = await req.json()
    return res(
      ctx.json({
        id: Date.now().toString(),
        title,
        completed: false,
      })
    )
  }),
]
```

### Component Mocks
```typescript
// src/test/mocks/react-router-dom.tsx
import { MemoryRouter } from 'react-router-dom'

export const withRouter = (component: React.ReactElement) => (
  <MemoryRouter>{component}</MemoryRouter>
)
```

## 🚀 Performance Tests

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: https://ohugods.github.io/TaskFlow
          configPath: .lighthouserc.json
```

### Performance Metrics
```typescript
// src/test/performance.test.ts
import { render } from '@/test/utils'
import { TaskList } from '@/components/TaskList'

describe('Performance Tests', () => {
  it('renders large task list efficiently', () => {
    const startTime = performance.now()

    const largeTaskList = Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      title: `Task ${i}`,
      completed: false,
      priority: 'medium' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    render(<TaskList tasks={largeTaskList} />)

    const endTime = performance.now()
    const renderTime = endTime - startTime

    // Should render in less than 100ms
    expect(renderTime).toBeLessThan(100)
  })
})
```

## 🔧 Test Debugging

### Useful Commands
```bash
# Run specific tests
npm run test -- TaskCard.test.tsx

# Run with debugging
npm run test -- --inspect-brk

# Run only failing tests
npm run test -- --run --reporter=verbose

# Update snapshots
npm run test -- -u
```

### Visual Debugging
```typescript
// src/test/debug.ts
export const debug = {
  logElement: (element: HTMLElement) => {
    console.log('Element:', element)
    console.log('Classes:', element.className)
    console.log('Text:', element.textContent)
  },

  logComponent: (component: React.Component) => {
    console.log('Component:', component)
    console.log('Props:', component.props)
    console.log('State:', component.state)
  },
}
```

## 🎯 Best Practices

### Principles
- **Test behavior, not implementation**
- **Tests must be independent**
- **Use realistic test data**
- **Mocks must be specific**
- **Tests must be fast**

### Structure
- **Arrange:** Set up initial state
- **Act:** Execute action being tested
- **Assert:** Verify expected result

### Naming
```typescript
// ✅ GOOD
describe('TaskCard', () => {
  describe('when task is completed', () => {
    it('shows completed styling', () => {
      // test
    })
  })
})

// ❌ BAD
describe('test', () => {
  it('should work', () => {
    // test
  })
})
```

## 📈 Quality Goals

### Coverage by File
- **Components:** > 90%
- **Hooks:** > 85%
- **Utils:** > 95%
- **Services:** > 80%

### Performance
- **Unit tests:** < 100ms each
- **Integration tests:** < 500ms each
- **Complete suite:** < 30s

### Maintainability
- **Readable and descriptive tests**
- **Updated mocks**
- **Documentation of complex scenarios**

---

## 📚 Additional Resources

- [Testing Library Documentation](https://testing-library.com/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

For questions about specific tests, consult the development team or open an issue in the repository.
