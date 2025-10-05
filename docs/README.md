# TaskFlow

Uma aplicação moderna e intuitiva de gerenciamento de tarefas construída com React, TypeScript e Tailwind CSS.

[![TaskFlow](https://img.shields.io/badge/TaskFlow-1.0.0-blue)](@https://github.com/ohugods/taskflow)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-blue)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)


## ✨ Funcionalidades

- ✅ **Criação e edição de tarefas** - Adicione títulos, descrições, prioridades e datas de vencimento
- 🎯 **Sistema de prioridades** - Organize tarefas por prioridade (Alta, Média, Baixa)
- 📅 **Datas de vencimento** - Defina prazos e visualize tarefas atrasadas
- 🔍 **Filtros avançados** - Busque por título, descrição, prioridade e status
- 📊 **Estatísticas em tempo real** - Acompanhe seu progresso com métricas visuais
- 💾 **Armazenamento local** - Suas tarefas são salvas automaticamente no navegador
- 🎨 **Interface moderna** - Design responsivo e intuitivo
- 🌙 **Notificações** - Feedback visual para todas as ações
- 🧪 **Testes abrangentes** - Cobertura de testes unitários e de integração

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e dev server
- **Vitest** - Framework de testes
- **React Testing Library** - Utilitários para testes de componentes
- **React Hot Toast** - Notificações elegantes
- **Lucide React** - Ícones modernos

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone @https://github.com/ohugods/taskflow.git
   cd taskflow
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador em `http://localhost:3000`

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção

# Testes
npm run test         # Executa testes
npm run test:ui      # Interface visual dos testes
npm run test:coverage # Cobertura de testes

# Qualidade de código
npm run lint         # Verifica problemas de linting
npm run lint:fix     # Corrige problemas de linting
npm run type-check   # Verifica tipos TypeScript
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── __tests__/      # Testes dos componentes
│   ├── TaskItem.tsx    # Item individual de tarefa
│   ├── TaskForm.tsx    # Formulário de criação/edição
│   ├── TaskFilters.tsx # Filtros de busca
│   ├── TaskStats.tsx   # Estatísticas
│   └── App.tsx         # Componente principal
├── hooks/              # Custom hooks
│   ├── __tests__/      # Testes dos hooks
│   └── useTasks.ts     # Hook para gerenciamento de tarefas
├── types/              # Definições TypeScript
│   └── task.ts         # Tipos relacionados a tarefas
├── utils/              # Utilitários
│   ├── __tests__/      # Testes dos utilitários
│   ├── dateUtils.ts    # Funções de manipulação de datas
│   └── priorityUtils.ts # Funções de prioridades
├── test/               # Configuração de testes
│   └── setup.ts        # Setup do ambiente de teste
├── index.css           # Estilos globais
└── main.tsx            # Ponto de entrada da aplicação
```

## 🎯 Funcionalidades Detalhadas

### Gerenciamento de Tarefas

- **Criação**: Adicione novas tarefas com título obrigatório, descrição opcional, prioridade e data de vencimento
- **Edição**: Modifique qualquer aspecto de uma tarefa existente
- **Exclusão**: Remova tarefas individualmente ou em lote (tarefas concluídas)
- **Conclusão**: Marque tarefas como concluídas com um clique

### Sistema de Prioridades

- **Alta**: Tarefas urgentes e importantes
- **Média**: Tarefas importantes mas não urgentes
- **Baixa**: Tarefas menos críticas

### Filtros e Busca

- **Busca por texto**: Encontre tarefas por título ou descrição
- **Filtro por prioridade**: Visualize apenas tarefas de uma prioridade específica
- **Filtro por status**: Separe tarefas concluídas das pendentes
- **Ordenação inteligente**: Tarefas são ordenadas por prioridade, data de vencimento e data de criação

### Estatísticas

- **Progresso geral**: Barra de progresso mostrando percentual de conclusão
- **Contadores**: Total de tarefas, concluídas, pendentes, atrasadas e que vencem hoje
- **Indicadores visuais**: Cores e ícones para fácil identificação

## 🧪 Testes

O projeto possui cobertura abrangente de testes:

- **Testes de componentes**: Verificação de renderização, interações e estados
- **Testes de hooks**: Validação da lógica de negócio
- **Testes de utilitários**: Funções auxiliares e helpers
- **Testes de integração**: Fluxos completos da aplicação

### Executando os testes

```bash
# Todos os testes
npm run test

# Interface visual
npm run test:ui

# Cobertura
npm run test:coverage
```

## 🎨 Design e UX

- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Interface intuitiva**: Navegação clara e ações óbvias
- **Feedback visual**: Notificações e estados visuais para todas as ações
- **Acessibilidade**: Componentes semânticos e navegação por teclado
- **Performance**: Carregamento rápido e interações fluidas

## 🔧 Configuração e Personalização

### Variáveis de Ambiente

O projeto não requer variáveis de ambiente para funcionamento básico. Todas as configurações estão no código.

### Personalização de Estilos

- **Cores**: Modifique o arquivo `tailwind.config.js` para alterar a paleta de cores
- **Fontes**: Altere as fontes no arquivo `index.html` e `tailwind.config.js`
- **Componentes**: Personalize estilos no arquivo `src/index.css`

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:

- **Desktop**: Layout em colunas com sidebar
- **Tablet**: Layout adaptativo com navegação otimizada
- **Mobile**: Interface simplificada e touch-friendly

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Deploy em Vercel

1. Conecte seu repositório ao Vercel
2. Configure as seguintes opções:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Deploy em Netlify

1. Conecte seu repositório ao Netlify
2. Configure as seguintes opções:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o arquivo [CONTRIBUTING.md](./developer/contributing.md) para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./developer/license.md) para detalhes.

## 👨‍💻 Autor

**Hugo Dalmasio**

- GitHub: [@ohugods](@https://github.com/ohugods)
- LinkedIn: [Hugo Dalmasio](https://linkedin.com/in/hugodalmasio)

## 🙏 Agradecimentos

- [React](https://reactjs.org/) - Biblioteca para interfaces de usuário
- [TypeScript](https://www.typescriptlang.org/) - JavaScript com tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Vite](https://vitejs.dev/) - Build tool moderna
- [Lucide](https://lucide.dev/) - Ícones bonitos e consistentes
- [React Hot Toast](https://react-hot-toast.com/) - Notificações elegantes

## 📊 Estatísticas do Projeto

- **Linhas de código**: ~2,000+
- **Componentes**: 6 principais
- **Hooks personalizados**: 1
- **Utilitários**: 2 módulos
- **Cobertura de testes**: 90%+
- **Dependências**: 15 principais
- **Tamanho do bundle**: ~150KB (gzipped)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
