# 📏 Coding Standards - TaskFlow

This document defines the code standards and conventions adopted in the TaskFlow project, ensuring consistency and quality in development.

## 🎯 General Principles

### Code Quality
- **Readability:** Code should be easy to understand
- **Maintainability:** Easy to modify and extend
- **Performance:** Optimized for good performance
- **Security:** Follow good security practices
- **Testability:** Code should be testable

### Conventions
- **Consistency:** Follow established patterns
- **Simplicity:** Simple solutions are preferred
- **DRY:** Don't Repeat Yourself
- **SOLID:** Object-oriented design principles

## 📝 Language and Syntax

### TypeScript

#### Compiler Configuration
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
  }
}
```

#### Types and Interfaces
```typescript
// ✅ GOOD: Descriptive interface
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ❌ BAD: Any type or weak types
interface Task {
  id: any;
  title: string;
  description: string;
  completed: boolean;
  priority: string; // Should be enum/union
}
```

#### Type Guards and Assertions
```typescript
// ✅ GOOD: Type guard
function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'completed' in obj
  );
}

// ✅ GOOD: Type assertion when necessary
const task = response.data as Task;
```

### JavaScript/React

#### Functional Components
```tsx
// ✅ GOOD: Functional component with hooks
interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  return (
    <div className="task-card">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
    </div>
  );
};
```

#### Custom Hooks
```typescript
// ✅ GOOD: Well structured custom hook
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = useCallback(async (task: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await taskService.create(task);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
  };
};
```

## 🏗️ Structure and Organization

### Imports
```typescript
// ✅ GOOD: Organized and grouped imports
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

// Hooks
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/hooks/useTheme';

// Utils
import { formatDate } from '@/utils/dateUtils';
import { validateTask } from '@/utils/validation';

// Types
import type { Task, TaskFormData } from '@/types/Task';
```

### File Structure
```
src/
├── components/
│   ├── ui/           # Base components (Button, Input, etc.)
│   ├── layout/       # Layout (Header, Sidebar, etc.)
│   ├── tasks/        # Task functionalities
│   └── common/       # Shared components
├── hooks/
│   ├── useTasks.ts   # Main hook
│   ├── useTheme.ts   # Theme hook
│   └── index.ts      # Re-exports
├── utils/
│   ├── dateUtils.ts  # Date utilities
│   ├── validation.ts # Validation
│   └── index.ts      # Re-exports
└── types/
    ├── Task.ts       # Task types
    ├── User.ts       # User types
    └── index.ts      # Re-exports
```

## 🎨 Styles and CSS

### Tailwind CSS
```tsx
// ✅ GOOD: Organized Tailwind classes
const TaskCard = ({ task, isCompleted }) => (
  <div className={`
    p-4 rounded-lg border transition-all duration-200
    ${isCompleted
      ? 'bg-green-50 border-green-200 text-green-800'
      : 'bg-white border-gray-200 hover:border-gray-300'
    }
  `}>
    <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
    <p className="text-gray-600">{task.description}</p>
  </div>
);
```

### CSS Modules (when necessary)
```css
/* styles/TaskCard.module.css */
.taskCard {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.taskCard:hover {
  border-color: var(--border-hover-color);
}

.taskCard.completed {
  background-color: var(--success-bg);
  border-color: var(--success-border);
}
```

## 🧪 Testing

### Test Structure
```typescript
// ✅ GOOD: Complete test with describe/it
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

### Coverage Requirements
- **Components:** > 90%
- **Hooks:** > 85%
- **Utils:** > 95%
- **Services:** > 80%

## 📝 Documentation

### Components
```tsx
/**
 * TaskCard - Component to display an individual task
 *
 * @param task - Object of the task to be displayed
 * @param onToggle - Function called when marking/unmarking task
 * @param onEdit - Function called when editing task
 * @param onDelete - Function called when deleting task
 *
 * @example
 * ```tsx
 * <TaskCard
 *   task={task}
 *   onToggle={(id) => toggleTask(id)}
 *   onEdit={(task) => openEditModal(task)}
 *   onDelete={(id) => deleteTask(id)}
 * />
 * ```
 */
interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
```

### Functions
```typescript
/**
 * formatDate - Format a date for display
 *
 * @param date - Date to be formatted
 * @param format - Desired format (default: 'MM/DD/YYYY')
 * @returns Formatted date as string
 *
 * @example
 * ```typescript
 * formatDate(new Date(), 'MM/DD/YYYY') // "12/25/2023"
 * formatDate(new Date(), 'DD/MM/YYYY') // "25/12/2023"
 * ```
 */
export function formatDate(date: Date, format: string = 'MM/DD/YYYY'): string {
  // implementation
}
```

## 🔧 Quality Tools

### ESLint
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/prop-types": "off",
    "react/react-in-preferences": ["error", "never"]
  }
}
```

### Prettier
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🚀 Performance

### Optimizations
```tsx
// ✅ GOOD: Appropriate memoization
const TaskList = memo(({ tasks, onTaskUpdate }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onTaskUpdate}
        />
      ))}
    </div>
  );
});

// ✅ GOOD: useCallback for stable functions
const handleTaskUpdate = useCallback((updatedTask) => {
  setTasks(prev => prev.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  ));
}, []);
```

### Code Splitting
```typescript
// ✅ GOOD: Lazy loading of components
const TaskForm = lazy(() => import('./TaskForm'));
const Statistics = lazy(() => import('./Statistics'));

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <TaskForm />
</Suspense>
```

## 🔒 Security

### Input Validation
```typescript
// ✅ GOOD: Sanitized validation
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .slice(0, 1000); // Limit size
}

// ✅ GOOD: Type validation
export function validateTask(task: unknown): Task | null {
  if (!isTask(task)) return null;

  return {
    ...task,
    title: sanitizeInput(task.title),
    description: task.description
      ? sanitizeInput(task.description)
      : undefined,
  };
}
```

### Authentication and Authorization
```typescript
// ✅ GOOD: Permission verification
export function canEditTask(user: User, task: Task): boolean {
  return user.id === task.userId || user.role === 'admin';
}

// ✅ GOOD: Data sanitization
export function sanitizeUserData(userData: UserInput): User {
  return {
    id: generateId(),
    name: sanitizeInput(userData.name),
    email: sanitizeEmail(userData.email),
    role: 'user', // Always start as regular user
  };
}
```

## 📦 Versioning and Commits

### Conventional Commits
```bash
# ✅ GOOD: Descriptive and standardized commits
feat(tasks): add task filtering by priority
fix(ui): resolve mobile layout overflow issue
docs(readme): update installation instructions
refactor(utils): optimize date formatting functions
test(tasks): add unit tests for task validation
chore(deps): update React to version 18.2.0
```

### Semantic Versioning
- **MAJOR:** Breaking compatibility
- **MINOR:** Compatible new feature
- **PATCH:** Bug fix

## 🔄 Code Review

### Review Checklist
- [ ] Code follows established standards
- [ ] TypeScript types are correct
- [ ] Tests have been added/updated
- [ ] Documentation has been updated
- [ ] Performance has been considered
- [ ] Security has been verified
- [ ] Linting passes without errors

### Review Comments
```markdown
<!-- ✅ GOOD -->
👍 Great implementation! Clean and well-tested code.

<!-- ❌ BAD -->
❌ Add validation for this input
❌ Missing test for this edge case
❌ Function too complex, consider splitting
```

---

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn/think-in-react)
- [Tailwind CSS Guidelines](https://tailwindcss.com/docs/utility-first)
- [Conventional Commits](https://conventionalcommits.org/)

For questions about specific standards, consult the development team or open a discussion in the repository.
