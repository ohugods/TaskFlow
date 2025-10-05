# Modelos de Dados

Esta seção documenta detalhadamente os modelos de dados utilizados pelo TaskFlow, incluindo tipos TypeScript, estruturas e validações.

## Modelo Principal: Task

A tarefa é o objeto central do TaskFlow, representando uma unidade de trabalho a ser gerenciada.

### Definição TypeScript

```typescript
interface Task {
  // Identificação única
  id: string

  // Conteúdo da tarefa
  title: string
  description?: string

  // Estado e prioridade
  completed: boolean
  priority: 'low' | 'medium' | 'high'

  // Controle temporal
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Campos obrigatórios

#### `id: string`
- **Tipo**: String UUID v4
- **Formato**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Geração**: Automática via `crypto.randomUUID()`
- **Restrições**: Deve ser único globalmente

#### `title: string`
- **Tipo**: String
- **Restrições**:
  - Obrigatório (não pode ser vazio)
  - Máximo 200 caracteres
  - Deve ser único na lista de tarefas
- **Validação**: Trim automático de espaços em branco

#### `completed: boolean`
- **Tipo**: Boolean
- **Valor padrão**: `false`
- **Estados**:
  - `false`: Tarefa pendente
  - `true`: Tarefa concluída

#### `priority: 'low' | 'medium' | 'high'`
- **Tipo**: String literal
- **Valores possíveis**:
  - `'low'`: Baixa prioridade (verde)
  - `'medium'`: Média prioridade (amarelo)
  - `'high'`: Alta prioridade (vermelho)
- **Valor padrão**: `'medium'`

#### `createdAt: Date`
- **Tipo**: Date (timestamp)
- **Geração**: Automática no momento da criação
- **Formato**: ISO 8601
- **Imutável**: Nunca modificado após criação

#### `updatedAt: Date`
- **Tipo**: Date (timestamp)
- **Geração**: Automática a cada modificação
- **Formato**: ISO 8601
- **Atualização**: Sempre que qualquer campo é modificado

### Campos opcionais

#### `description?: string`
- **Tipo**: String opcional
- **Restrições**:
  - Máximo 1000 caracteres
  - Pode conter quebras de linha
  - Trim automático de espaços em branco

#### `dueDate?: Date`
- **Tipo**: Date opcional
- **Formato**: ISO 8601 com hora definida como 00:00:00
- **Validação**: Deve ser futura ou presente (não pode ser no passado)
- **Timezone**: Sempre armazenado em UTC

## Modelo de Formulário: TaskFormData

Dados utilizados para criar ou editar tarefas.

```typescript
interface TaskFormData {
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
}
```

### Diferenças do modelo Task

- Não inclui `id` (gerado automaticamente)
- Não inclui `completed` (sempre inicia como `false`)
- Não inclui `createdAt` e `updatedAt` (gerados automaticamente)

## Modelo de Filtros: TaskFilters

Parâmetros utilizados para filtrar e buscar tarefas.

```typescript
interface TaskFilters {
  search: string
  priority: 'all' | 'low' | 'medium' | 'high'
  status: 'all' | 'completed' | 'pending'
}
```

### Campos de filtro

#### `search: string`
- **Tipo**: String
- **Função**: Busca por texto nos campos `title` e `description`
- **Case-insensitive**: Não diferencia maiúsculas/minúsculas
- **Busca parcial**: Encontra substrings

#### `priority: 'all' | 'low' | 'medium' | 'high'`
- **Tipo**: String literal
- **Valores**:
  - `'all'`: Todas as prioridades
  - `'low'`: Apenas baixa prioridade
  - `'medium'`: Apenas média prioridade
  - `'high'`: Apenas alta prioridade

#### `status: 'all' | 'completed' | 'pending'`
- **Tipo**: String literal
- **Valores**:
  - `'all'`: Todas as tarefas
  - `'completed'`: Apenas concluídas
  - `'pending'`: Apenas pendentes

## Tipos Auxiliares

### Priority (tipo união)

```typescript
type Priority = 'low' | 'medium' | 'high'
```

### TaskStatus (tipo união)

```typescript
type TaskStatus = 'pending' | 'completed'
```

### Estados de Carregamento

```typescript
interface LoadingState {
  loading: boolean
  error?: string
}
```

## Validações

### Validações de criação

#### Título obrigatório
```typescript
if (!title.trim()) {
  throw new Error('Título é obrigatório')
}
```

#### Título único
```typescript
const existingTask = tasks.find(task =>
  task.title.toLowerCase() === title.toLowerCase()
)
if (existingTask) {
  throw new Error('Já existe uma tarefa com este título')
}
```

#### Descrição opcional
```typescript
if (description) {
  description = description.trim()
  if (description.length > 1000) {
    throw new Error('Descrição muito longa (máximo 1000 caracteres)')
  }
}
```

### Validações de data

#### Data de vencimento futura
```typescript
if (dueDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)

  if (dueDate < today) {
    throw new Error('Data de vencimento deve ser futura')
  }
}
```

## Serialização e Persistência

### Conversão para JSON

```typescript
// Antes de salvar no localStorage
const serializedTasks = JSON.stringify(tasks, (key, value) => {
  if (value instanceof Date) {
    return value.toISOString()
  }
  return value
})
```

### Deserialização do JSON

```typescript
// Após carregar do localStorage
const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
  ...task,
  createdAt: new Date(task.createdAt),
  updatedAt: new Date(task.updatedAt),
  dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
}))
```

## Estados Derivados

### Estatísticas calculadas

```typescript
interface TaskStats {
  total: number
  completed: number
  pending: number
  overdue: number
  dueToday: number
  completionRate: number
}
```

### Cálculo das estatísticas

```typescript
const stats: TaskStats = {
  total: tasks.length,
  completed: tasks.filter(t => t.completed).length,
  pending: tasks.filter(t => !t.completed).length,
  overdue: tasks.filter(t =>
    t.dueDate && !t.completed && isOverdue(t.dueDate)
  ).length,
  dueToday: tasks.filter(t =>
    t.dueDate && !t.completed && isDueToday(t.dueDate)
  ).length,
  completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
}
```

## Ordenação e Filtros

### Ordenação padrão

As tarefas são ordenadas por:

1. **Status**: Pendentes primeiro, depois concluídas
2. **Prioridade**: Alta > Média > Baixa
3. **Data de vencimento**: Mais próximas primeiro
4. **Data de criação**: Mais recentes primeiro

### Algoritmo de ordenação

```typescript
const sortTasksByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Status first (pending before completed)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Priority order
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Due date (earlier first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    }

    // Creation date (newer first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
```

## Tratamento de Erros

### Tipos de erro comuns

```typescript
enum TaskError {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DUPLICATE_TITLE = 'DUPLICATE_TITLE',
  STORAGE_ERROR = 'STORAGE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR'
}
```

### Estrutura de erro

```typescript
interface TaskError {
  type: TaskError
  message: string
  field?: keyof TaskFormData
  code?: string
}
```

## Versionamento de Dados

### Compatibilidade futura

O modelo de dados é versionado para permitir migrações:

```typescript
const DATA_VERSION = '1.0'
const STORAGE_KEYS = {
  TASKS: 'taskflow-tasks-v1',
  SETTINGS: 'taskflow-settings-v1'
}
```

### Migração de dados

```typescript
const migrateData = (oldData: any, version: string): Task[] => {
  switch (version) {
    case '1.0':
      return oldData // Já no formato correto
    default:
      throw new Error(`Unsupported data version: ${version}`)
  }
}
```

## Considerações de Performance

### Limitações atuais

- **Número máximo de tarefas**: ~1000 (dependendo do navegador)
- **Tamanho máximo por tarefa**: ~10KB
- **Operações simultâneas**: Não suportadas (single-threaded)

### Otimizações implementadas

- **Memoização**: Cálculos de estatísticas em cache
- **Virtualização**: Lista eficiente para grandes volumes
- **Debounce**: Busca com atraso para evitar cálculos excessivos

Esta documentação dos modelos de dados fornece uma visão completa da estrutura interna do TaskFlow, facilitando desenvolvimento, manutenção e integração futura.
