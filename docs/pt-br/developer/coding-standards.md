# 📏 Padrões de Código - TaskFlow

Este documento define os padrões de código e convenções adotadas no projeto TaskFlow, garantindo consistência e qualidade no desenvolvimento.

## 🎯 Princípios Gerais

### Qualidade de Código
- **Legibilidade:** Código deve ser fácil de entender
- **Manutenibilidade:** Fácil de modificar e estender
- **Performance:** Otimizado para boa performance
- **Segurança:** Seguir boas práticas de segurança
- **Testabilidade:** Código deve ser testável

### Convenções
- **Consistência:** Seguir padrões estabelecidos
- **Simplicidade:** Soluções simples são preferidas
- **DRY:** Don't Repeat Yourself
- **SOLID:** Princípios de design orientado a objetos

## 📝 Linguagem e Sintaxe

### TypeScript

#### Configuração do Compilador
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

#### Tipos e Interfaces
```typescript
// ✅ BOM: Interface descritiva
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

// ❌ RUIM: Tipo any ou tipos fracos
interface Task {
  id: any;
  title: string;
  description: string;
  completed: boolean;
  priority: string; // Deveria ser enum/union
}
```

#### Type Guards e Assertions
```typescript
// ✅ BOM: Type guard
function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'completed' in obj
  );
}

// ✅ BOM: Type assertion quando necessário
const task = response.data as Task;
```

### JavaScript/React

#### Componentes Funcionais
```tsx
// ✅ BOM: Componente funcional com hooks
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

#### Hooks Customizados
```typescript
// ✅ BOM: Hook customizado bem estruturado
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
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
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

## 🏗️ Estrutura e Organização

### Imports
```typescript
// ✅ BOM: Imports organizados e agrupados
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

### Estrutura de Arquivos
```
src/
├── components/
│   ├── ui/           # Componentes base (Button, Input, etc.)
│   ├── layout/       # Layout (Header, Sidebar, etc.)
│   ├── tasks/        # Funcionalidades de tarefas
│   └── common/       # Componentes compartilhados
├── hooks/
│   ├── useTasks.ts   # Hook principal
│   ├── useTheme.ts   # Hook de tema
│   └── index.ts      # Re-exports
├── utils/
│   ├── dateUtils.ts  # Utilitários de data
│   ├── validation.ts # Validação
│   └── index.ts      # Re-exports
└── types/
    ├── Task.ts       # Tipos de tarefa
    ├── User.ts       # Tipos de usuário
    └── index.ts      # Re-exports
```

## 🎨 Estilos e CSS

### Tailwind CSS
```tsx
// ✅ BOM: Classes Tailwind organizadas
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

### CSS Modules (quando necessário)
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

## 🧪 Testes

### Estrutura de Testes
```typescript
// ✅ BOM: Teste completo com describe/it
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import { Task } from '@/types/Task';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  priority: 'medium',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TaskCard', () => {
  it('renders task title and description', () => {
    render(<TaskCard task={mockTask} onToggle={() => {}} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const mockOnToggle = jest.fn();
    render(<TaskCard task={mockTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });
});
```

### Cobertura de Testes
- **Componentes:** Testar renderização e interações
- **Hooks:** Testar lógica e efeitos
- **Utils:** Testar funções utilitárias
- **Integração:** Testar fluxos completos
- **Meta de cobertura:** Mínimo 80%

## 📝 Documentação

### Componentes
```tsx
/**
 * TaskCard - Componente para exibir uma tarefa individual
 *
 * @param task - Objeto da tarefa a ser exibida
 * @param onToggle - Função chamada ao marcar/desmarcar tarefa
 * @param onEdit - Função chamada ao editar tarefa
 * @param onDelete - Função chamada ao excluir tarefa
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

### Funções
```typescript
/**
 * formatDate - Formata uma data para exibição
 *
 * @param date - Data a ser formatada
 * @param format - Formato desejado (padrão: 'DD/MM/YYYY')
 * @returns Data formatada como string
 *
 * @example
 * ```typescript
 * formatDate(new Date(), 'DD/MM/YYYY') // "25/12/2023"
 * formatDate(new Date(), 'MM/DD/YYYY') // "12/25/2023"
 * ```
 */
export function formatDate(date: Date, format: string = 'DD/MM/YYYY'): string {
  // implementação
}
```

## 🔧 Ferramentas de Qualidade

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

### Otimizações
```tsx
// ✅ BOM: Memoização apropriada
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

// ✅ BOM: useCallback para funções estáveis
const handleTaskUpdate = useCallback((updatedTask) => {
  setTasks(prev => prev.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  ));
}, []);
```

### Bundle Splitting
```typescript
// ✅ BOM: Lazy loading de componentes
const TaskForm = lazy(() => import('./TaskForm'));
const Statistics = lazy(() => import('./Statistics'));

// Uso com Suspense
<Suspense fallback={<Loading />}>
  <TaskForm />
</Suspense>
```

## 🔒 Segurança

### Validação de Entrada
```typescript
// ✅ BOM: Validação sanitizada
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove tags HTML
    .slice(0, 1000); // Limita tamanho
}

// ✅ BOM: Validação de tipos
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

### Autenticação e Autorização
```typescript
// ✅ BOM: Verificação de permissões
export function canEditTask(user: User, task: Task): boolean {
  return user.id === task.userId || user.role === 'admin';
}

// ✅ BOM: Sanitização de dados do usuário
export function sanitizeUserData(userData: UserInput): User {
  return {
    id: generateId(),
    name: sanitizeInput(userData.name),
    email: sanitizeEmail(userData.email),
    role: 'user', // Sempre começa como user comum
  };
}
```

## 📦 Versionamento e Commits

### Conventional Commits
```bash
# ✅ BOM: Commits descritivos e padronizados
feat(tasks): add task filtering by priority
fix(ui): resolve mobile layout overflow issue
docs(readme): update installation instructions
refactor(utils): optimize date formatting functions
test(tasks): add unit tests for task validation
chore(deps): update React to version 18.2.0
```

### Versionamento Semântico
- **MAJOR:** Quebra de compatibilidade
- **MINOR:** Nova funcionalidade compatível
- **PATCH:** Correção de bug

## 🔄 Code Review

### Checklist de Review
- [ ] Código segue os padrões estabelecidos
- [ ] TypeScript types estão corretos
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Performance foi considerada
- [ ] Segurança foi verificada
- [ ] Linting passa sem erros

### Comentários de Review
```markdown
<!-- ✅ BOM -->
👍 Ótima implementação! Código limpo e bem testado.

<!-- ❌ RUIM -->
❌ Adicione validação para este input
❌ Falta teste para este caso edge
❌ Função muito complexa, considere dividir
```

---

## 📚 Recursos Adicionais

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn/think-in-react)
- [Tailwind CSS Guidelines](https://tailwindcss.com/docs/utility-first)
- [Conventional Commits](https://conventionalcommits.org/)

Para dúvidas sobre padrões específicos, consulte a equipe de desenvolvimento ou abra uma discussão no repositório.
