# Guia de Contribuição

Obrigado por considerar contribuir com o Task Manager! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 🤝 Código de Conduta

Este projeto segue um código de conduta para garantir um ambiente acolhedor e inclusivo para todos os contribuidores. Esperamos que todos os participantes:

- Sejam respeitosos e inclusivos
- Aceitem críticas construtivas
- Foquem no que é melhor para a comunidade
- Mostrem empatia com outros membros da comunidade

## 🚀 Como Contribuir

### Tipos de Contribuição

- 🐛 **Correção de bugs**
- ✨ **Novas funcionalidades**
- 📚 **Melhorias na documentação**
- 🧪 **Testes adicionais**
- 🎨 **Melhorias de UI/UX**
- ⚡ **Otimizações de performance**

### Configuração do Ambiente

1. **Fork o repositório**
   ```bash
   # No GitHub, clique no botão "Fork"
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU_USUARIO/task-manager-app.git
   cd taskflow
   ```

3. **Adicione o repositório original como upstream**
   ```bash
   git remote add upstream @https://github.com/ohugods/taskflow.git
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Execute os testes para verificar se tudo está funcionando**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

## 📝 Padrões de Código

### Estrutura de Commits

Use commits semânticos seguindo o padrão:

```
tipo(escopo): descrição

[corpo opcional]

[rodapé opcional]
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, espaços, etc.
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Mudanças em ferramentas, configurações, etc.

**Exemplos:**
```bash
feat(tasks): adiciona filtro por data de vencimento
fix(ui): corrige layout responsivo no mobile
docs(readme): atualiza instruções de instalação
```

### Padrões de Código

#### TypeScript/JavaScript

- Use **TypeScript** para todo o código
- Prefira **arrow functions** para funções simples
- Use **const** por padrão, **let** quando necessário
- Evite **var**
- Use **interfaces** para tipos de objetos
- Prefira **type** para unions e primitivos

```typescript
// ✅ Bom
interface Task {
  id: string
  title: string
  completed: boolean
}

const addTask = (task: Task): void => {
  // implementação
}

// ❌ Ruim
function addTask(task) {
  // implementação
}
```

#### React

- Use **functional components** com hooks
- Prefira **custom hooks** para lógica reutilizável
- Use **useCallback** e **useMemo** quando apropriado
- Mantenha componentes pequenos e focados

```tsx
// ✅ Bom
const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id)
  }, [task.id, onToggle])

  return (
    <div className="task-item">
      {/* JSX */}
    </div>
  )
}

// ❌ Ruim
const TaskItem = ({ task, onToggle }) => {
  return (
    <div onClick={() => onToggle(task.id)}>
      {/* JSX */}
    </div>
  )
}
```

#### CSS/Styling

- Use **Tailwind CSS** para estilização
- Prefira **utility classes** sobre CSS customizado
- Use **component classes** para estilos reutilizáveis
- Mantenha consistência com o design system

```tsx
// ✅ Bom
<div className="card p-4 hover:shadow-md transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900">Título</h3>
</div>

// ❌ Ruim
<div style={{ padding: '1rem', backgroundColor: 'white' }}>
  <h3>Título</h3>
</div>
```

#### Testes

- Escreva testes para todas as funcionalidades
- Use **descriptive test names**
- Teste **comportamento**, não implementação
- Mantenha testes simples e focados

```typescript
// ✅ Bom
describe('TaskItem', () => {
  it('calls onToggle when checkbox is clicked', () => {
    const mockOnToggle = vi.fn()
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />)
    
    fireEvent.click(screen.getByRole('checkbox'))
    
    expect(mockOnToggle).toHaveBeenCalledWith(mockTask.id)
  })
})

// ❌ Ruim
describe('TaskItem', () => {
  it('works', () => {
    render(<TaskItem />)
    // teste vago
  })
})
```

### Nomenclatura

#### Arquivos e Pastas

- Use **kebab-case** para arquivos e pastas
- Use **PascalCase** para componentes React
- Use **camelCase** para funções e variáveis
- Use **UPPER_SNAKE_CASE** para constantes

```
src/
├── components/
│   ├── task-item.tsx          # ✅ kebab-case
│   └── TaskForm.tsx           # ✅ PascalCase
├── hooks/
│   └── useTasks.ts            # ✅ camelCase
└── utils/
    └── dateUtils.ts           # ✅ camelCase
```

#### Variáveis e Funções

```typescript
// ✅ Bom
const taskList = []
const isTaskCompleted = true
const MAX_TASKS_PER_PAGE = 10

const handleTaskToggle = () => {}
const formatDate = (date: Date) => {}

// ❌ Ruim
const tasklist = []
const is_task_completed = true
const maxTasksPerPage = 10

const handle_task_toggle = () => {}
const FormatDate = (date: Date) => {}
```

## 🔄 Processo de Pull Request

### Antes de Enviar

1. **Atualize seu fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

3. **Faça suas mudanças**
   - Implemente a funcionalidade
   - Adicione testes
   - Atualize documentação se necessário

4. **Execute os checks**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run format:check
   ```

5. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

6. **Push para seu fork**
   ```bash
   git push origin feature/nova-funcionalidade
   ```

### Template do Pull Request

```markdown
## 📝 Descrição

Breve descrição das mudanças realizadas.

## 🔗 Tipo de Mudança

- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou funcionalidade que quebra funcionalidade existente)
- [ ] Documentação (mudanças apenas na documentação)

## 🧪 Como Testar

1. Passo 1
2. Passo 2
3. Passo 3

## 📸 Screenshots (se aplicável)

Adicione screenshots para ajudar a explicar sua mudança.

## ✅ Checklist

- [ ] Meu código segue os padrões de estilo do projeto
- [ ] Realizei uma auto-revisão do meu código
- [ ] Comentei código complexo
- [ ] Minhas mudanças não geram warnings
- [ ] Adicionei testes que provam que minha correção é eficaz
- [ ] Testes novos e existentes passam localmente
- [ ] Atualizei a documentação conforme necessário

## 🔍 Revisão

- [ ] Código revisado
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Performance verificada
```

### Critérios de Aceitação

- ✅ Código segue os padrões estabelecidos
- ✅ Testes passam (incluindo novos testes)
- ✅ Documentação atualizada
- ✅ Sem warnings ou erros de lint
- ✅ Funcionalidade testada manualmente
- ✅ Performance não degradada

## 🐛 Reportando Bugs

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug

Descrição clara e concisa do problema.

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## 🎯 Comportamento Esperado

Descrição do que deveria acontecer.

## 📸 Screenshots

Se aplicável, adicione screenshots para ajudar a explicar o problema.

## 🖥️ Ambiente

- OS: [ex: Windows 10, macOS 11, Ubuntu 20.04]
- Navegador: [ex: Chrome 91, Firefox 89, Safari 14]
- Versão do Node: [ex: 16.14.0]
- Versão do npm: [ex: 7.19.0]

## 📋 Contexto Adicional

Qualquer outra informação relevante sobre o problema.
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
## ✨ Funcionalidade Sugerida

Descrição clara e concisa da funcionalidade desejada.

## 🎯 Problema que Resolve

Descrição do problema que esta funcionalidade resolveria.

## 💭 Solução Proposta

Descrição da solução que você gostaria de ver implementada.

## 🔄 Alternativas Consideradas

Descrição de outras soluções ou funcionalidades que você considerou.

## 📋 Contexto Adicional

Qualquer outro contexto ou screenshots sobre a funcionalidade.
```

## 🏷️ Labels

Usamos labels para organizar issues e PRs:

- `bug`: Algo não está funcionando
- `enhancement`: Nova funcionalidade ou melhoria
- `documentation`: Melhorias na documentação
- `good first issue`: Bom para novos contribuidores
- `help wanted`: Precisa de ajuda extra
- `question`: Mais informações são necessárias
- `wontfix`: Não será corrigido
- `duplicate`: Issue ou PR duplicado

## 📚 Recursos Adicionais

- [Documentação do React](https://reactjs.org/docs)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Guia de Contribuição do GitHub](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests)

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no README do projeto. Obrigado por contribuir! 🚀

---

Se você tiver dúvidas, não hesite em abrir uma issue ou entrar em contato!
