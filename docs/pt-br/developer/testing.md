# 🧪 Guia de Testes - TaskFlow

Este documento descreve a estratégia de testes adotada no TaskFlow, incluindo tipos de testes, ferramentas utilizadas e melhores práticas.

## 🎯 Estratégia de Testes

### Pirâmide de Testes
```
     E2E Tests (ponta)
    Integration Tests (meio)
   Unit Tests (base)
```

### Cobertura de Testes
- **Unitários:** Mínimo 80% de cobertura
- **Integração:** Principais fluxos de usuário
- **E2E:** Cenários críticos de negócio

## 🛠️ Ferramentas de Teste

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

## 🧩 Testes Unitários

### Componentes
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
    // Mock para simular erro
    const mockAddTask = jest.fn().mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useTasks())

    act(() => {
      // Forçar erro simulado
    })

    await waitFor(() => {
      expect(result.current.error).toBe('API Error')
    })
  })
})
```

### Utilitários
```typescript
// src/utils/dateUtils.test.ts
import { formatDate, isOverdue, getDaysUntilDue } from './dateUtils'

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date in Brazilian format', () => {
      const date = new Date(2023, 11, 25) // 25 de dezembro de 2023
      expect(formatDate(date)).toBe('25/12/2023')
    })

    it('formats date with custom format', () => {
      const date = new Date(2023, 11, 25)
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-12-25')
    })

    it('handles invalid dates', () => {
      expect(formatDate(new Date('invalid'))).toBe('Data inválida')
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

## 🔗 Testes de Integração

### Componentes Compostos
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

    // Preenche título
    await user.type(screen.getByLabelText(/título/i), 'Nova Tarefa')

    // Preenche descrição
    await user.type(
      screen.getByLabelText(/descrição/i),
      'Descrição da tarefa'
    )

    // Seleciona prioridade
    await user.selectOptions(
      screen.getByLabelText(/prioridade/i),
      'high'
    )

    // Define data de vencimento
    const dateInput = screen.getByLabelText(/data de vencimento/i)
    await user.type(dateInput, '2023-12-31')

    // Submete formulário
    await user.click(screen.getByRole('button', { name: /salvar/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Nova Tarefa',
        description: 'Descrição da tarefa',
        priority: 'high',
        dueDate: expect.any(Date),
      })
    })
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    render(<TaskForm onSubmit={mockOnSubmit} />)

    // Tenta submeter sem título
    await user.click(screen.getByRole('button', { name: /salvar/i }))

    expect(screen.getByText(/título é obrigatório/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
```

### Fluxos de Usuário
```typescript
// src/components/TaskManager.test.tsx
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { TaskManager } from './TaskManager'

describe('TaskManager User Flows', () => {
  it('completes full task lifecycle', async () => {
    const user = userEvent.setup()

    render(<TaskManager />)

    // Cria uma tarefa
    await user.click(screen.getByRole('button', { name: /nova tarefa/i }))
    await user.type(screen.getByLabelText(/título/i), 'Tarefa de Teste')
    await user.click(screen.getByRole('button', { name: /salvar/i }))

    // Verifica se tarefa foi criada
    expect(screen.getByText('Tarefa de Teste')).toBeInTheDocument()

    // Marca como concluída
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    // Verifica se foi movida para concluídas
    expect(screen.getByText('Tarefa de Teste')).toHaveClass('completed')

    // Filtra tarefas concluídas
    await user.click(screen.getByRole('button', { name: /concluídas/i }))

    // Verifica se aparece na lista de concluídas
    expect(screen.getByText('Tarefa de Teste')).toBeInTheDocument()

    // Exclui a tarefa
    await user.click(screen.getByRole('button', { name: /excluir/i }))
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    // Verifica se foi removida
    expect(screen.queryByText('Tarefa de Teste')).not.toBeInTheDocument()
  })
})
```

## 🌐 Testes E2E

### Playwright
```typescript
// e2e/task-management.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('should create and manage a task', async ({ page }) => {
    // Navega para a aplicação
    await page.goto('/')

    // Cria uma nova tarefa
    await page.click('[data-testid="new-task-button"]')
    await page.fill('[data-testid="task-title"]', 'Tarefa E2E')
    await page.fill('[data-testid="task-description"]', 'Descrição da tarefa')
    await page.selectOption('[data-testid="task-priority"]', 'high')
    await page.click('[data-testid="save-task"]')

    // Verifica se tarefa foi criada
    await expect(page.locator('text=Tarefa E2E')).toBeVisible()

    // Marca como concluída
    await page.check('[data-testid="task-checkbox"]')

    // Verifica estado visual
    await expect(page.locator('[data-testid="task-item"]')).toHaveClass(/completed/)

    // Filtra tarefas concluídas
    await page.click('[data-testid="filter-completed"]')

    // Verifica se tarefa aparece no filtro
    await expect(page.locator('text=Tarefa E2E')).toBeVisible()

    // Exclui a tarefa
    await page.click('[data-testid="delete-task"]')
    await page.click('[data-testid="confirm-delete"]')

    // Verifica se foi removida
    await expect(page.locator('text=Tarefa E2E')).toBeHidden()
  })

  test('should persist data after page reload', async ({ page }) => {
    // Cria tarefa
    await page.click('[data-testid="new-task-button"]')
    await page.fill('[data-testid="task-title"]', 'Tarefa Persistente')
    await page.click('[data-testid="save-task"]')

    // Recarrega página
    await page.reload()

    // Verifica se tarefa ainda existe
    await expect(page.locator('text=Tarefa Persistente')).toBeVisible()
  })
})
```

## 📊 Cobertura de Testes

### Configuração da Cobertura
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

### Scripts de Teste
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

## 🎭 Mocks e Stubs

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

## 🚀 Testes de Performance

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

### Métricas de Performance
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

    // Deve renderizar em menos de 100ms
    expect(renderTime).toBeLessThan(100)
  })
})
```

## 🔧 Debugging de Testes

### Comandos Úteis
```bash
# Executar testes específicos
npm run test -- TaskCard.test.tsx

# Executar com debugging
npm run test -- --inspect-brk

# Executar apenas testes falhando
npm run test -- --run --reporter=verbose

# Atualizar snapshots
npm run test -- -u
```

### Debugging Visual
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

## 📈 Melhores Práticas

### Princípios
- **Teste comportamento, não implementação**
- **Testes devem ser independentes**
- **Use dados de teste realistas**
- **Mocks devem ser específicos**
- **Testes devem ser rápidos**

### Estrutura
- **Arrange:** Configure o estado inicial
- **Act:** Execute a ação sendo testada
- **Assert:** Verifique o resultado esperado

### Nomenclatura
```typescript
// ✅ BOM
describe('TaskCard', () => {
  describe('when task is completed', () => {
    it('shows completed styling', () => {
      // teste
    })
  })
})

// ❌ RUIM
describe('test', () => {
  it('should work', () => {
    // teste
  })
})
```

## 🎯 Metas de Qualidade

### Cobertura por Arquivo
- **Componentes:** > 90%
- **Hooks:** > 85%
- **Utils:** > 95%
- **Services:** > 80%

### Performance
- **Testes unitários:** < 100ms cada
- **Testes de integração:** < 500ms cada
- **Suite completa:** < 30s

### Manutenibilidade
- **Testes legíveis e descritivos**
- **Mocks atualizados**
- **Documentação de cenários complexos**

---

## 📚 Recursos Adicionais

- [Testing Library Documentation](https://testing-library.com/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

Para dúvidas sobre testes específicos, consulte a equipe de desenvolvimento ou abra uma issue no repositório.
