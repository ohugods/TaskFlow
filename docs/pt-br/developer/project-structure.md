# 🏗️ Estrutura do Projeto - TaskFlow

Esta documentação detalha a organização e arquitetura do código do TaskFlow, ajudando desenvolvedores a entenderem e contribuírem para o projeto.

## 📁 Estrutura Geral do Projeto

```
taskflow/
├── 📂 public/              # Arquivos estáticos públicos
│   ├── favicon.ico        # Ícone da aplicação
│   ├── robots.txt         # Configuração para bots
│   └── manifest.json      # PWA manifest
├── 📂 src/                # Código fonte principal
│   ├── 📂 components/     # Componentes React
│   ├── 📂 hooks/         # Hooks customizados
│   ├── 📂 utils/         # Utilitários e helpers
│   ├── 📂 types/         # Definições TypeScript
│   ├── 📂 contexts/      # Contextos React
│   ├── 📂 services/      # Serviços e APIs
│   ├── 📂 styles/        # Estilos globais
│   ├── 📂 test/          # Configurações de teste
│   ├── 📂 assets/        # Recursos estáticos
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── 📂 docs/              # Documentação
├── 📂 .github/           # Configurações GitHub
│   ├── workflows/        # GitHub Actions
│   └── ISSUE_TEMPLATE/   # Templates de issues
├── 📄 package.json       # Dependências e scripts
├── 📄 vite.config.ts     # Configuração Vite
├── 📄 tsconfig.json      # Configuração TypeScript
└── 📄 README.md          # Documentação principal
```

## 🔧 Arquivos de Configuração

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
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## 📂 Estrutura Detalhada do `src/`

### `components/`
```
components/
├── 📂 ui/                 # Componentes base/UI
│   ├── Button.tsx        # Botão reutilizável
│   ├── Input.tsx         # Campo de entrada
│   ├── Modal.tsx         # Modal genérico
│   └── ...
├── 📂 layout/            # Layout e navegação
│   ├── Header.tsx        # Cabeçalho da aplicação
│   ├── Sidebar.tsx       # Barra lateral
│   ├── Footer.tsx        # Rodapé
│   └── ...
├── 📂 tasks/             # Componentes específicos de tarefas
│   ├── TaskCard.tsx      # Cartão de tarefa
│   ├── TaskForm.tsx      # Formulário de tarefa
│   ├── TaskList.tsx      # Lista de tarefas
│   └── ...
├── 📂 dashboard/         # Componentes do dashboard
│   ├── StatsCard.tsx     # Cartão de estatísticas
│   ├── Charts.tsx        # Gráficos
│   └── ...
└── 📂 common/            # Componentes compartilhados
    ├── Loading.tsx       # Indicador de carregamento
    ├── ErrorBoundary.tsx # Tratamento de erros
    └── EmptyState.tsx    # Estado vazio
```

### `hooks/`
```
hooks/
├── 📂 tasks/             # Hooks relacionados a tarefas
│   ├── useTasks.ts       # Gerenciamento de tarefas
│   ├── useTaskFilters.ts # Filtros de tarefas
│   └── useTaskStats.ts   # Estatísticas de tarefas
├── 📂 ui/                # Hooks de interface
│   ├── useLocalStorage.ts # Persistência local
│   ├── useTheme.ts       # Gerenciamento de tema
│   └── useKeyboard.ts    # Atalhos de teclado
├── 📂 api/               # Hooks de API
│   ├── useApi.ts         # Cliente HTTP
│   └── useSync.ts        # Sincronização
└── 📂 common/            # Hooks utilitários
    ├── useDebounce.ts    # Debounce
    ├── useAsync.ts       # Operações assíncronas
    └── usePrevious.ts    # Valor anterior
```

### `utils/`
```
utils/
├── 📂 date/              # Utilitários de data
│   ├── formatDate.ts     # Formatação de datas
│   ├── dateUtils.ts      # Funções de data
│   └── timezones.ts      # Fusos horários
├── 📂 validation/        # Validação
│   ├── taskValidation.ts # Validação de tarefas
│   ├── formValidation.ts # Validação de formulários
│   └── inputValidation.ts # Validação de entrada
├── 📂 storage/           # Armazenamento
│   ├── localStorage.ts   # localStorage wrapper
│   ├── sessionStorage.ts # sessionStorage wrapper
│   └── indexedDB.ts      # IndexedDB utilities
├── 📂 export/            # Exportação
│   ├── jsonExport.ts     # Export JSON
│   ├── csvExport.ts      # Export CSV
│   └── pdfExport.ts      # Export PDF
└── 📂 constants/         # Constantes
    ├── themes.ts         # Temas disponíveis
    ├── priorities.ts     # Prioridades
    └── defaults.ts       # Valores padrão
```

### `types/`
```
types/
├── 📂 api/               # Tipos de API
│   ├── responses.ts      # Respostas da API
│   ├── requests.ts       # Requisições da API
│   └── endpoints.ts      # Endpoints
├── 📂 components/        # Props de componentes
│   ├── TaskCardProps.ts  # Props do TaskCard
│   ├── FormProps.ts      # Props de formulários
│   └── ModalProps.ts     # Props de modais
├── 📂 models/            # Modelos de dados
│   ├── Task.ts           # Modelo Task
│   ├── User.ts           # Modelo User
│   └── Settings.ts       # Modelo Settings
└── 📂 common/            # Tipos comuns
    ├── Status.ts         # Status da aplicação
    ├── Priority.ts       # Prioridades
    └── Theme.ts          # Temas
```

### `contexts/`
```
contexts/
├── 📂 app/               # Contextos principais
│   ├── AppContext.tsx    # Contexto principal
│   └── AppProvider.tsx   # Provider principal
├── 📂 tasks/             # Contextos de tarefas
│   ├── TasksContext.tsx  # Contexto de tarefas
│   └── TasksProvider.tsx # Provider de tarefas
├── 📂 ui/                # Contextos de UI
│   ├── ThemeContext.tsx  # Contexto de tema
│   ├── ModalContext.tsx  # Contexto de modais
│   └── NotificationContext.tsx # Contexto de notificações
└── 📂 auth/              # Contextos de autenticação
    ├── AuthContext.tsx   # Contexto de auth
    └── AuthProvider.tsx  # Provider de auth
```

### `services/`
```
services/
├── 📂 api/               # Serviços de API
│   ├── taskService.ts    # API de tarefas
│   ├── userService.ts    # API de usuários
│   └── syncService.ts    # API de sincronização
├── 📂 storage/           # Serviços de armazenamento
│   ├── localStorageService.ts # Serviço localStorage
│   ├── indexedDBService.ts    # Serviço IndexedDB
│   └── cloudStorageService.ts # Serviço nuvem
├── 📂 notifications/     # Serviços de notificação
│   ├── browserNotification.ts # Notificações navegador
│   ├── desktopNotification.ts # Notificações desktop
│   └── emailNotification.ts   # Notificações email
└── 📂 utils/             # Serviços utilitários
    ├── exportService.ts  # Serviço de exportação
    ├── importService.ts  # Serviço de importação
    └── backupService.ts  # Serviço de backup
```

## 🏛️ Arquitetura da Aplicação

### Padrão de Arquitetura
O TaskFlow segue uma arquitetura baseada em **componentes** com separação clara de responsabilidades:

- **Components:** Interface do usuário (presentational)
- **Hooks:** Lógica de negócio e estado (business logic)
- **Services:** Comunicação externa (external communication)
- **Utils:** Funções auxiliares (utilities)
- **Types:** Definições de tipos (type definitions)

### Fluxo de Dados
```
User Action → Component → Hook → Service → External API
                      ↓
                Context Update → Component Re-render
```

### Gerenciamento de Estado
- **Local State:** useState para estado local de componentes
- **Global State:** Context API para estado compartilhado
- **Server State:** React Query/SWR para dados do servidor
- **Persistent State:** localStorage/IndexedDB para persistência

## 🎨 Padrões de Design

### Componentes
- **Functional Components** com hooks
- **TypeScript** para type safety
- **Styled Components** ou CSS Modules
- **Compound Components** para componentes complexos

### Hooks
- **Custom Hooks** para lógica reutilizável
- **useEffect** para side effects
- **useCallback/useMemo** para otimização
- **Error Boundaries** para tratamento de erros

### Estilos
- **Tailwind CSS** para styling utilitário
- **CSS Variables** para temas
- **Responsive Design** com mobile-first
- **Dark Mode** support

## 🧪 Estrutura de Testes

```
src/
├── 📂 __tests__/        # Testes unitários
│   ├── components/      # Testes de componentes
│   ├── hooks/          # Testes de hooks
│   └── utils/          # Testes de utilitários
├── 📂 __tests__/integration/  # Testes de integração
├── 📂 __tests__/e2e/    # Testes end-to-end
└── 📂 test/            # Configurações de teste
    ├── setup.ts        # Configuração Vitest
    ├── utils.ts        # Utilitários de teste
    └── mocks/          # Mocks para testes
```

## 🚀 Build e Deploy

### Processo de Build
```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

### Estrutura de Build
```
dist/
├── 📂 assets/           # Recursos otimizados
│   ├── index-[hash].css # CSS minificado
│   ├── index-[hash].js  # JS bundle
│   └── ...
├── index.html          # HTML principal
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

## 📋 Convenções de Código

### Nomenclatura
- **Components:** PascalCase (TaskCard, UserProfile)
- **Hooks:** camelCase com prefixo use (useTasks, useTheme)
- **Utils:** camelCase (formatDate, validateEmail)
- **Types:** PascalCase (Task, UserSettings)
- **Files:** PascalCase para components, camelCase para outros

### Estrutura de Commits
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(tasks): add task filtering
- fix(ui): resolve mobile layout issue
- docs(readme): update installation guide
```

### Code Quality
- **ESLint** para linting
- **Prettier** para formatação
- **TypeScript** para type checking
- **Husky** para pre-commit hooks
- **Commitlint** para conventional commits

## 🔧 Ferramentas de Desenvolvimento

### Editor
- **VS Code** como editor principal
- **Extensions:** TypeScript, ESLint, Prettier, Tailwind CSS
- **Settings:** Format on save, organize imports

### Navegador
- **Chrome/Edge** para desenvolvimento
- **DevTools** para debugging
- **React DevTools** para components
- **Lighthouse** para performance

### CLI Tools
- **Vite** para desenvolvimento/build
- **Vitest** para testes
- **ESLint** para linting
- **Prettier** para formatação

## 📚 Documentação

### Estrutura da Documentação
```
docs/
├── 📂 pt-br/            # Português brasileiro
│   ├── getting-started/ # Guias iniciais
│   ├── user-guide/      # Guias do usuário
│   └── developer/       # Guias do desenvolvedor
├── 📂 en-us/            # English
└── README.md            # Documentação principal
```

### Tipos de Documentação
- **README:** Visão geral e instalação
- **API Docs:** Referência da API
- **Guides:** Tutoriais passo-a-passo
- **Cookbook:** Exemplos práticos
- **Changelog:** Histórico de mudanças

---

## 🤝 Contribuindo

Para contribuir com o projeto:

1. **Entenda a estrutura** descrita acima
2. **Siga as convenções** estabelecidas
3. **Adicione testes** para novas funcionalidades
4. **Atualize a documentação** conforme necessário
5. **Envie um Pull Request** seguindo o guia de contribuição

Para mais detalhes, consulte o [Guia de Contribuição](contributing.md).
