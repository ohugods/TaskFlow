# Estrutura do Projeto

Este documento descreve a organização completa do projeto TaskFlow, seguindo as melhores práticas de desenvolvimento profissional.

## Visão Geral

```
taskflow/                          # Projeto TaskFlow
├── docs/                         # 📚 Documentação completa
│   ├── README.md                 # Visão geral do projeto
│   ├── getting-started/          # 🚀 Guias de instalação e configuração
│   │   ├── installation.md       # Como instalar o projeto
│   │   ├── quick-start.md        # Guia de 5 minutos para começar
│   │   └── configuration.md      # Configurações avançadas
│   ├── user-guide/               # 👥 Guias para usuários finais
│   │   ├── features.md           # Todas as funcionalidades
│   │   ├── interface.md          # Documentação da interface
│   │   └── troubleshooting.md    # Solução de problemas comuns
│   ├── developer/                # 🛠 Documentação técnica
│   │   ├── contributing.md       # Como contribuir
│   │   ├── project-structure.md # Este arquivo
│   │   └── license.md            # Licença MIT
│   ├── api/                      # 🔌 Documentação da API
│   │   ├── overview.md           # Visão geral da arquitetura
│   │   └── data-models.md        # Modelos de dados detalhados
│   ├── changelog/                # 📝 Histórico de versões
│   │   └── changelog.md          # Registro de mudanças
│   └── assets/                   # 🖼 Recursos de documentação
├── src/                          # 💻 Código fonte
│   ├── components/               # ⚛️ Componentes React
│   │   ├── App.tsx               # Componente principal
│   │   ├── TaskItem.tsx          # Item individual de tarefa
│   │   ├── TaskForm.tsx          # Formulário de criação/edição
│   │   ├── TaskFilters.tsx       # Filtros de busca
│   │   ├── TaskStats.tsx         # Estatísticas e métricas
│   │   └── __tests__/            # 🧪 Testes dos componentes
│   ├── hooks/                    # 🪝 Custom hooks
│   │   ├── useTasks.ts           # Hook principal de gerenciamento
│   │   └── __tests__/            # 🧪 Testes dos hooks
│   ├── types/                    # 📝 Definições TypeScript
│   │   └── task.ts               # Tipos relacionados a tarefas
│   ├── utils/                    # 🔧 Utilitários e helpers
│   │   ├── dateUtils.ts          # Funções de manipulação de datas
│   │   ├── priorityUtils.ts      # Funções de prioridades
│   │   └── __tests__/            # 🧪 Testes dos utilitários
│   ├── lib/                      # 📚 Bibliotecas e constantes
│   │   └── constants.ts          # Constantes centrais da aplicação
│   ├── styles/                   # 🎨 Arquivos de estilo
│   │   └── index.css             # Estilos principais com Tailwind
│   ├── assets/                   # 🖼 Recursos estáticos (futuro)
│   ├── test/                     # 🧪 Configuração de testes
│   │   └── setup.ts              # Setup do ambiente de teste
│   └── main.tsx                  # Ponto de entrada da aplicação
├── public/                       # 🌐 Arquivos públicos
│   └── vite.svg                  # Ícone padrão do Vite
├── .vscode/                      # ⚙️ Configurações do editor
│   ├── settings.json             # Configurações do workspace
│   └── extensions.json           # Extensões recomendadas
├── .github/                      # 🔧 Configurações do GitHub
│   ├── workflows/                # 🤖 Actions de CI/CD
│   │   ├── ci.yml                # Pipeline de integração contínua
│   │   └── deploy.yml            # Deploy automático
│   ├── ISSUE_TEMPLATE/           # 📋 Templates para issues
│   │   ├── bug_report.yml        # Template para bugs
│   │   └── feature_request.yml   # Template para funcionalidades
│   ├── pull_request_template.md  # Template para PRs
│   ├── CODEOWNERS                # Responsáveis por arquivos
│   └── dependabot.yml            # Atualizações automáticas
├── node_modules/                 # 📦 Dependências (gerenciado pelo npm)
├── dist/                         # 🚀 Build de produção (gerado)
├── .env.example                  # ⚙️ Exemplo de variáveis de ambiente
├── .nvmrc                        # 🏷 Versão recomendada do Node.js
├── .gitignore                    # 🚫 Arquivos ignorados pelo Git
├── .prettierrc                   # 🎨 Configurações do Prettier
├── .eslintrc.cjs                 # 🔍 Configurações do ESLint
├── package.json                  # 📄 Dependências e scripts
├── tsconfig.json                 # ⚡ Configurações do TypeScript
├── tsconfig.node.json            # 🔧 Configurações para Node.js
├── vite.config.ts                # ⚡ Configurações do Vite
├── tailwind.config.js            # 🎨 Configurações do Tailwind CSS
├── postcss.config.js             # ⚡ Configurações do PostCSS
├── index.html                    # 🌐 Arquivo HTML principal
└── README.md                     # 📖 Visão geral rápida (raiz)
```

## Princípios de Organização

### 1. **Estrutura Modular**
- Cada módulo tem sua responsabilidade clara
- Separação entre lógica de negócio e apresentação
- Reutilização de código através de hooks e utilitários

### 2. **Testes em Todos os Níveis**
- Testes unitários para funções e hooks
- Testes de componentes para interface
- Testes de integração para fluxos completos
- Cobertura > 90% mantida

### 3. **Documentação Completa**
- Guias para diferentes públicos (usuários, desenvolvedores)
- Documentação técnica detalhada da API
- Exemplos práticos e casos de uso

### 4. **Automação e Qualidade**
- CI/CD com GitHub Actions
- Linting e formatação automática
- Testes automatizados em cada PR
- Deploy automático em produção

## Detalhamento por Diretório

### `/docs/` - Documentação Completa
- **Público-alvo**: Usuários finais, desenvolvedores, contribuidores
- **Estrutura**: Organizada por tópicos e níveis de conhecimento
- **Formato**: Markdown para máxima compatibilidade

### `/src/` - Código Fonte
- **Linguagem**: TypeScript para tipagem estática
- **Framework**: React 18 com hooks modernos
- **Estilo**: Tailwind CSS para interface consistente

### `/src/components/` - Componentes React
- **Responsabilidade**: Renderização da interface
- **Padrão**: Functional components com hooks
- **Testes**: Cada componente tem testes abrangentes

### `/src/hooks/` - Lógica de Negócio
- **Responsabilidade**: Estado e lógica da aplicação
- **Padrão**: Custom hooks reutilizáveis
- **Persistência**: LocalStorage para dados offline

### `/src/utils/` - Utilitários
- **Responsabilidade**: Funções auxiliares e cálculos
- **Categorias**: Datas, prioridades, formatação
- **Testes**: Cobertura completa de funções

### `/src/types/` - Definições TypeScript
- **Responsabilidade**: Contratos de tipos seguros
- **Extensão**: Interfaces e tipos para toda aplicação
- **Manutenção**: Evolução controlada com versionamento

## Padrões de Desenvolvimento

### Convenções de Nomenclatura
- **Arquivos**: `kebab-case` para arquivos, `PascalCase` para componentes
- **Funções**: `camelCase` para funções e hooks
- **Constantes**: `UPPER_SNAKE_CASE` para constantes
- **Tipos**: `PascalCase` para interfaces e tipos

### Estrutura de Código
```typescript
// ✅ Padrão seguido
interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  // Componente funcional com hooks
  const handleToggle = useCallback(() => onToggle(task.id), [task.id, onToggle])

  return (
    <div className="task-item">
      {/* JSX estruturado */}
    </div>
  )
}
```

### Organização de Imports
```typescript
// 1. React e bibliotecas externas
import React, { useState, useCallback } from 'react'

// 2. Tipos internos
import { Task, TaskFormData } from '@/types/task'

// 3. Hooks customizados
import { useTasks } from '@/hooks/useTasks'

// 4. Componentes locais
import { TaskItem } from './TaskItem'

// 5. Utilitários
import { formatDate } from '@/utils/dateUtils'

// 6. Estilos
import './TaskItem.css'
```

## Ferramentas de Desenvolvimento

### Build e Desenvolvimento
- **Vite**: Build tool rápida e moderna
- **Hot Module Replacement**: Recarga instantânea durante desenvolvimento
- **TypeScript**: Compilação e checagem de tipos

### Qualidade de Código
- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática
- **Husky**: Git hooks para qualidade
- **Lint-staged**: Lint apenas arquivos modificados

### Testes
- **Vitest**: Framework de testes rápido
- **React Testing Library**: Testes de componentes
- **jsdom**: Ambiente de teste para DOM
- **@testing-library/jest-dom**: Matchers customizados

### CI/CD
- **GitHub Actions**: Pipelines automatizadas
- **Dependabot**: Atualizações de segurança
- **Codecov**: Relatórios de cobertura
- **Vercel**: Deploy automático

## Manutenção e Evolução

### Versionamento Semântico
- **Major**: Mudanças que quebram compatibilidade
- **Minor**: Novas funcionalidades sem quebra
- **Patch**: Correções de bugs

### Controle de Qualidade
- **Code Review**: Revisão obrigatória de PRs
- **Testes automatizados**: Rodam em cada PR
- **Análise de cobertura**: Mantida acima de 90%
- **Auditoria de segurança**: Dependências verificadas

### Documentação Viva
- **Atualização contínua**: Docs evoluem com o código
- **Exemplos práticos**: Casos de uso reais
- **Referências cruzadas**: Links entre documentos relacionados

Esta estrutura garante que o TaskFlow seja:
- **Escalável**: Fácil de crescer e adicionar funcionalidades
- **Mantível**: Código organizado e documentado
- **Testável**: Cobertura abrangente de testes
- **Acessível**: Documentação clara para diferentes públicos
- **Profissional**: Seguindo padrões da indústria

Para dúvidas sobre a estrutura ou organização, consulte a [documentação de contribuição](../contributing.md) ou abra uma [issue](@https://github.com/ohugods/taskflow/issues).
