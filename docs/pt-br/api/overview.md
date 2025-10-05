# Visão Geral da API

O TaskFlow utiliza uma arquitetura baseada em hooks React e armazenamento local. Esta seção documenta a API interna da aplicação para desenvolvedores que desejam contribuir ou integrar com o sistema.

## Arquitetura Geral

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Componentes   │    │     Hooks       │    │   LocalStorage  │
│                 │◄──►│                 │◄──►│                 │
│ - TaskItem      │    │ - useTasks      │    │ - Persistência  │
│ - TaskForm      │    │ - Custom Logic  │    │ - Sincronização │
│ - TaskFilters   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Fluxo de Dados

1. **Interface do usuário** → Componentes React
2. **Lógica de negócio** → Custom Hooks (useTasks)
3. **Persistência** → LocalStorage do navegador
4. **Estado global** → Context API (se necessário)

## Principais Tecnologias

### Frontend
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização

### Desenvolvimento
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **ESLint** - Análise de código
- **Prettier** - Formatação

## Modelo de Dados

### Estrutura de Tarefa

```typescript
interface Task {
  id: string           // UUID único
  title: string        // Título obrigatório
  description?: string // Descrição opcional
  completed: boolean   // Status de conclusão
  priority: 'low' | 'medium' | 'high'  // Nível de prioridade
  dueDate?: Date       // Data de vencimento (opcional)
  createdAt: Date      // Data de criação
  updatedAt: Date      // Última atualização
}
```

### Dados de Formulário

```typescript
interface TaskFormData {
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
}
```

### Filtros de Busca

```typescript
interface TaskFilters {
  search: string                    // Texto de busca
  priority: 'all' | 'low' | 'medium' | 'high'  // Filtro por prioridade
  status: 'all' | 'completed' | 'pending'      // Filtro por status
}
```

## Hooks Principais

### useTasks

Hook central para gerenciamento de tarefas.

```typescript
const {
  tasks,        // Array de tarefas
  loading,      // Estado de carregamento
  addTask,      // Função para adicionar tarefa
  updateTask,   // Função para atualizar tarefa
  toggleTask,   // Função para alternar conclusão
  deleteTask,   // Função para deletar tarefa
  clearCompleted // Função para limpar concluídas
} = useTasks()
```

#### Métodos disponíveis

**addTask(taskData: TaskFormData): Task**
- Cria uma nova tarefa
- Gera ID único automaticamente
- Salva no localStorage
- Retorna a tarefa criada

**updateTask(id: string, updates: Partial<TaskFormData>): void**
- Atualiza tarefa existente
- Aceita apenas campos a serem modificados
- Atualiza timestamp de modificação

**toggleTask(id: string): void**
- Alterna status de conclusão
- Atualiza timestamp de modificação

**deleteTask(id: string): void**
- Remove tarefa permanentemente
- Não pode ser desfeito

**clearCompleted(): void**
- Remove todas as tarefas concluídas
- Útil para limpeza da lista

## Utilitários

### dateUtils

Módulo para manipulação de datas.

```typescript
// Formatação
formatDate(date: Date): string        // DD/MM/YYYY
formatDateTime(date: Date): string    // DD/MM/YYYY, HH:mm

// Validações
isOverdue(dueDate: Date): boolean     // Verifica se está atrasada
isDueToday(dueDate: Date): boolean    // Verifica se vence hoje

// Cálculos
getDaysUntilDue(dueDate: Date): number // Dias até o vencimento
```

### priorityUtils

Módulo para gerenciamento de prioridades.

```typescript
// Cores por prioridade
getPriorityColor(priority: Priority): string

// Labels traduzidos
getPriorityLabel(priority: Priority): string

// Ordenação inteligente
sortTasksByPriority(tasks: Task[]): Task[]
```

## Armazenamento

### Chave do localStorage

```javascript
const STORAGE_KEY = 'task-manager-tasks'
```

### Estrutura dos dados salvos

```json
[
  {
    "id": "uuid-string",
    "title": "Título da tarefa",
    "description": "Descrição opcional",
    "completed": false,
    "priority": "medium",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
]
```

## Estados da Aplicação

### Estados possíveis de uma tarefa

```typescript
type TaskStatus = 'pending' | 'completed'
type Priority = 'low' | 'medium' | 'high'
```

### Estados da interface

```typescript
interface AppState {
  tasks: Task[]
  loading: boolean
  filters: TaskFilters
  showForm: boolean
  editingTask: Task | null
}
```

## Padrões de Código

### Convenções de nomenclatura

- **Componentes**: PascalCase (`TaskItem.tsx`)
- **Hooks**: camelCase (`useTasks.ts`)
- **Utilitários**: camelCase (`dateUtils.ts`)
- **Tipos**: PascalCase (`Task.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`STORAGE_KEY`)

### Estrutura de arquivos

```
src/
├── components/        # Componentes React
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   └── __tests__/     # Testes dos componentes
├── hooks/            # Custom hooks
│   ├── useTasks.ts
│   └── __tests__/     # Testes dos hooks
├── types/            # Definições TypeScript
│   └── task.ts
├── utils/            # Utilitários
│   ├── dateUtils.ts
│   ├── priorityUtils.ts
│   └── __tests__/     # Testes dos utilitários
└── test/             # Configuração de testes
    └── setup.ts
```

## Testes

### Cobertura de testes

O projeto mantém alta cobertura de testes:

- **Componentes**: Testes de renderização e interação
- **Hooks**: Testes de lógica de negócio
- **Utilitários**: Testes de funções auxiliares
- **Integração**: Fluxos completos da aplicação

### Executando testes

```bash
# Todos os testes
npm run test

# Interface visual
npm run test:ui

# Cobertura
npm run test:coverage
```

## Configuração de Desenvolvimento

### Variáveis de ambiente

Não são necessárias variáveis de ambiente para desenvolvimento básico.

### Scripts disponíveis

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
  }
}
```

## Próximos Passos para Desenvolvedores

### Contribuindo com código

1. Leia o [Guia de Contribuição](../developer/contributing.md)
2. Configure o ambiente seguindo [Instalação](../getting-started/installation.md)
3. Explore os testes existentes para entender a estrutura
4. Implemente sua contribuição seguindo os padrões estabelecidos

### Estendendo funcionalidades

Áreas para expansão futura:
- **Sincronização**: Entre dispositivos e plataformas
- **Notificações**: Push notifications e lembretes
- **Integrações**: Com calendários e outras ferramentas
- **Colaboração**: Compartilhamento de listas de tarefas
- **Análise**: Métricas avançadas de produtividade

### Melhorias de performance

Oportunidades de otimização:
- **Virtualização**: Para listas muito grandes
- **Memoização**: De cálculos pesados
- **Lazy loading**: De componentes não críticos
- **Service Workers**: Para funcionalidades offline avançadas

Esta documentação da API serve como guia para desenvolvedores que desejam entender, contribuir ou integrar com o TaskFlow. Para dúvidas específicas, consulte a [documentação completa](../README.md) ou abra uma [issue](@https://github.com/ohugods/taskflow/issues).
