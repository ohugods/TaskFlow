# Interface do Usuário

Esta seção descreve detalhadamente a interface do TaskFlow, explicando cada elemento e como interagir com eles de forma eficiente.

## Layout Principal

A interface do TaskFlow é organizada em seções claras e intuitivas:

```
┌─────────────────────────────────────────────────────────┐
│  TaskFlow                                              │
│  Organize suas tarefas de forma eficiente...          │
├─────────────────────────────────────────────────────────┤
│  [Estatísticas]  [Ações]                               │
├─────────────────────────────────────────────────────────┤
│  [Filtros]                                            │
├─────────────────────────────────────────────────────────┤
│  [Lista de Tarefas]                                   │
├─────────────────────────────────────────────────────────┤
│  [Rodapé]                                             │
└─────────────────────────────────────────────────────────┘
```

## Cabeçalho Principal

### Título e descrição
- **TaskFlow**: Nome da aplicação em destaque
- **Subtítulo**: "Organize suas tarefas de forma eficiente e produtiva"

## Seção de Estatísticas

Localizada no topo, apresenta métricas importantes:

### Cards informativos
- **Total**: Número total de tarefas criadas
- **Concluídas**: Tarefas marcadas como finalizadas
- **Pendentes**: Tarefas ainda não concluídas
- **Atrasadas**: Tarefas com prazo expirado
- **Vencem hoje**: Tarefas com prazo para o dia atual

### Barra de progresso
- Mostra percentual visual de tarefas concluídas
- Verde indica progresso positivo
- Atualizada automaticamente

## Seção de Ações

Contém os principais controles da aplicação:

### Botão "Nova Tarefa"
- **Ícone**: Símbolo de adição (➕)
- **Cor**: Azul (primária)
- **Função**: Abre formulário de criação de tarefa
- **Atalho**: Pode ser ativado via teclado

### Botão "Limpar Concluídas"
- **Ícone**: Lixeira (🗑️)
- **Cor**: Cinza (secundário)
- **Função**: Remove todas as tarefas concluídas
- **Contador**: Mostra número de tarefas concluídas
- **Visibilidade**: Só aparece quando há tarefas concluídas

## Seção de Filtros

Permite filtrar e buscar tarefas de forma eficiente:

### Barra de busca
- **Ícone**: Lupa (🔍)
- **Placeholder**: "Buscar por título ou descrição..."
- **Função**: Filtra tarefas em tempo real
- **Case-insensitive**: Não diferencia maiúsculas/minúsculas

### Filtro de prioridade
- **Opções**: Todas, Alta, Média, Baixa
- **Indicadores visuais**: Cores correspondentes às prioridades

### Filtro de status
- **Opções**: Todas, Pendentes, Concluídas
- **Indicadores**: Ícones de status

### Botão "Limpar Filtros"
- **Ícone**: X (✖️)
- **Função**: Remove todos os filtros ativos
- **Visibilidade**: Só aparece quando há filtros ativos

### Contador de resultados
- Mostra número de tarefas encontradas
- Atualiza automaticamente conforme os filtros

## Lista de Tarefas

Exibe todas as tarefas em formato de lista organizada:

### Estrutura de cada tarefa

```
┌─○─[Título da Tarefa]───[Editar]─[Excluir]┐
│ Descrição da tarefa (se houver)         │
│ 🔴 Alta    📅 31/12/2023    🕐 Criada em 31/12/2023 │
└─────────────────────────────────────────┘
```

### Elementos interativos

#### Checkbox de conclusão
- **Estado vazio**: ○ (tarefa pendente)
- **Estado preenchido**: ● (tarefa concluída)
- **Cor**: Verde quando concluída
- **Função**: Alterna status da tarefa

#### Título da tarefa
- **Formatação**: Negrito quando pendente, riscado quando concluída
- **Cor**: Cinza quando concluída
- **Clique**: Não interativo (apenas visual)

#### Botão de edição
- **Ícone**: Lápis (✏️)
- **Cor**: Cinza padrão, azul ao hover
- **Função**: Abre formulário de edição

#### Botão de exclusão
- **Ícone**: Lixeira (🗑️)
- **Cor**: Cinza padrão, vermelho ao hover
- **Função**: Remove tarefa permanentemente

### Indicadores visuais

#### Prioridade
- **Fundo vermelho**: Alta prioridade
- **Fundo amarelo**: Média prioridade
- **Fundo verde**: Baixa prioridade

#### Data de vencimento
- **Texto vermelho**: Tarefas atrasadas
- **Texto laranja**: Tarefas que vencem hoje
- **Texto cinza**: Outras datas

#### Data de criação
- **Ícone**: Relógio (🕐)
- **Formato**: "Criada em DD/MM/YYYY"

## Formulário de Tarefa

Aparece quando se clica em "Nova Tarefa" ou "Editar":

### Campos do formulário

#### Título (obrigatório)
- **Tipo**: Campo de texto
- **Validação**: Não pode ficar vazio
- **Auto-focus**: Ativo automaticamente

#### Descrição (opcional)
- **Tipo**: Área de texto (3 linhas)
- **Placeholder**: "Digite uma descrição (opcional)"
- **Característica**: Expansível

#### Prioridade
- **Tipo**: Select dropdown
- **Opções**: Baixa, Média, Alta
- **Valor padrão**: Média

#### Data de vencimento
- **Tipo**: Input de data (calendário)
- **Formato**: YYYY-MM-DD
- **Opcional**: Pode ficar vazio

### Botões de ação

#### "Criar Tarefa" / "Atualizar Tarefa"
- **Cor**: Azul (primária)
- **Ícone**: Ícone de salvar
- **Posição**: Lado esquerdo

#### "Cancelar"
- **Cor**: Cinza (secundário)
- **Ícone**: Nenhum
- **Posição**: Lado direito

## Estados Especiais

### Tela de carregamento
- **Aparência**: Spinner animado
- **Texto**: "Carregando tarefas..."
- **Ocorrência**: Durante inicialização

### Lista vazia
- **Cenário**: Nenhuma tarefa criada
- **Ícone**: CheckCircle (✅)
- **Título**: "Nenhuma tarefa criada"
- **Texto**: "Comece criando sua primeira tarefa!"
- **Ação**: Botão "Criar Primeira Tarefa"

### Nenhum resultado encontrado
- **Cenário**: Filtros não retornam resultados
- **Ícone**: CheckCircle (✅)
- **Título**: "Nenhuma tarefa encontrada"
- **Texto**: "Tente ajustar os filtros..."
- **Ação**: Sugestão de ajustar filtros

## Responsividade

### Desktop (1200px+)
- Layout completo com todas as funcionalidades
- Cards lado a lado
- Filtros em linha

### Tablet (768px - 1199px)
- Layout adaptado para toque
- Botões maiores para toque
- Espaçamentos otimizados

### Mobile (< 768px)
- Layout simplificado
- Menu hambúrguer (se necessário)
- Interface touch-friendly
- Filtros empilhados

## Atalhos de Teclado

Para maior eficiência, utilize os seguintes atalhos:

| Atalho | Ação |
|--------|------|
| `Ctrl+N` | Nova tarefa |
| `Ctrl+F` | Focar barra de busca |
| `Esc` | Fechar formulários |
| `Enter` | Salvar tarefa (quando editando) |

## Acessibilidade

### Recursos implementados

- **Navegação por teclado**: Todas as funcionalidades acessíveis via Tab/Enter
- **Leitores de tela**: Textos descritivos e landmarks
- **Contraste**: Cores com contraste adequado (WCAG 2.1 AA)
- **Tamanho de fonte**: Escalonável até 200%
- **Indicação de foco**: Bordas claras nos elementos focados

### Elementos acessíveis

- **Buttons**: Todos com textos descritivos
- **Forms**: Labels associados corretamente
- **Icons**: Textos alternativos (aria-label)
- **Status**: Anunciados para leitores de tela

## Personalização Visual

### Cores do sistema
- **Primária**: Azul (#3b82f6)
- **Sucesso**: Verde (#10b981)
- **Aviso**: Amarelo (#f59e0b)
- **Erro**: Vermelho (#ef4444)
- **Neutro**: Cinza (variantes de #6b7280)

### Tipografia
- **Fonte principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Tamanhos**: 12px a 32px (escala responsiva)

## Performance Visual

### Animações
- **Transições**: 200ms para mudanças de estado
- **Hover**: Efeitos sutis nos botões
- **Loading**: Spinner animado suave

### Otimizações
- **Virtualização**: Lista eficiente para muitas tarefas
- **Lazy loading**: Recursos carregados conforme necessário
- **Cache**: Imagens e fontes em cache local

Esta interface foi cuidadosamente projetada para ser intuitiva, acessível e eficiente, permitindo que você gerencie suas tarefas da forma mais produtiva possível.
