# Funcionalidades

O TaskFlow oferece um conjunto abrangente de funcionalidades para gerenciar tarefas de forma eficiente e intuitiva. Esta seção detalha cada funcionalidade disponível.

## 🎯 Gerenciamento de Tarefas

### Criação de Tarefas

Para criar uma nova tarefa:

1. Clique no botão **"Nova Tarefa"** no canto superior esquerdo
2. Preencha o formulário com:
   - **Título** (obrigatório)
   - **Descrição** (opcional)
   - **Prioridade** (Baixa, Média, Alta)
   - **Data de vencimento** (opcional)

#### Campos obrigatórios
- **Título**: Deve ser único e descritivo

#### Campos opcionais
- **Descrição**: Detalhes adicionais sobre a tarefa
- **Data de vencimento**: Prazo para conclusão
- **Prioridade**: Nível de importância

### Edição de Tarefas

Para editar uma tarefa existente:

1. Clique no ícone de **lápis** (✏️) ao lado da tarefa
2. Modifique os campos desejados
3. Clique em **"Atualizar Tarefa"**

### Conclusão de Tarefas

Para marcar uma tarefa como concluída:

1. Clique no **círculo vazio** à esquerda do título da tarefa
2. A tarefa será riscada e movida para o final da lista

Para reverter:
1. Clique novamente no círculo (agora preenchido)
2. A tarefa retornará ao status pendente

### Exclusão de Tarefas

Para excluir uma tarefa:

1. Clique no ícone de **lixeira** (🗑️) ao lado da tarefa
2. Confirme a exclusão quando solicitado

#### Exclusão em lote
Para limpar tarefas concluídas:
1. Clique em **"Limpar Concluídas"** no cabeçalho
2. Todas as tarefas concluídas serão removidas

## 📊 Sistema de Prioridades

O TaskFlow utiliza três níveis de prioridade:

### 🔴 Alta Prioridade
- Tarefas urgentes e importantes
- Aparecem no topo da lista
- Indicadas com fundo vermelho

### 🟡 Média Prioridade
- Tarefas importantes mas não urgentes
- Ordem intermediária na lista
- Indicadas com fundo amarelo

### 🟢 Baixa Prioridade
- Tarefas menos críticas
- Aparecem no final da lista
- Indicadas com fundo verde

## 📅 Gestão de Prazos

### Definindo datas de vencimento

Ao criar ou editar uma tarefa:
1. Clique no campo **"Data de Vencimento"**
2. Selecione a data desejada no calendário
3. A tarefa será automaticamente categorizada

### Indicadores visuais de prazo

- **🔴 Atrasadas**: Tarefas com prazo expirado
- **🟠 Vencem hoje**: Tarefas com prazo para o dia atual
- **⏰ Próximas**: Tarefas com prazo nos próximos dias

## 🔍 Filtros e Busca

### Busca por texto

Digite na barra de busca para encontrar tarefas por:
- Título da tarefa
- Descrição da tarefa
- Palavras-chave

### Filtros por prioridade

No menu **"Prioridade"**:
- **Todas**: Mostra todas as tarefas
- **Alta**: Apenas tarefas de alta prioridade
- **Média**: Apenas tarefas de média prioridade
- **Baixa**: Apenas tarefas de baixa prioridade

### Filtros por status

No menu **"Status"**:
- **Todas**: Todas as tarefas
- **Pendentes**: Apenas tarefas não concluídas
- **Concluídas**: Apenas tarefas concluídas

### Combinando filtros

Você pode combinar múltiplos filtros simultaneamente:
- Busca + Prioridade + Status
- Todos os filtros funcionam em conjunto

## 📈 Estatísticas e Relatórios

### Cards de estatísticas

No topo da página, você encontra:
- **Total**: Número total de tarefas
- **Concluídas**: Tarefas finalizadas
- **Pendentes**: Tarefas em andamento
- **Atrasadas**: Tarefas com prazo expirado
- **Vencem hoje**: Tarefas com prazo para hoje

### Barra de progresso

Mostra o percentual de tarefas concluídas:
- Verde: Percentual de conclusão
- Calculado automaticamente baseado em tarefas concluídas vs. total

## 💾 Persistência de Dados

### Armazenamento local

Todas as tarefas são automaticamente salvas no navegador:
- Dados persistem entre sessões
- Não requer conexão com internet
- Funciona offline

### Backup automático

O TaskFlow salva automaticamente:
- A cada criação de tarefa
- A cada edição de tarefa
- A cada mudança de status
- A cada exclusão de tarefa

## 🎨 Interface Responsiva

### Design adaptativo

A interface se adapta automaticamente a diferentes dispositivos:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Layout otimizado para toque
- **Mobile**: Interface simplificada e touch-friendly

### Tema automático

O TaskFlow detecta automaticamente as preferências do sistema:
- **Modo claro**: Interface clara e limpa
- **Modo escuro**: Interface escura (quando suportado pelo sistema)

## 🚀 Recursos Avançados

### Ordenação inteligente

As tarefas são ordenadas automaticamente por:
1. **Status**: Pendentes primeiro, depois concluídas
2. **Prioridade**: Alta > Média > Baixa
3. **Data de vencimento**: Mais próximas primeiro
4. **Data de criação**: Mais recentes primeiro

### Notificações visuais

O TaskFlow fornece feedback visual para todas as ações:
- ✅ Confirmações de criação/edição/exclusão
- ⚠️ Avisos para tarefas sem título
- 🔴 Destaques para tarefas atrasadas

### Acessibilidade

Recursos de acessibilidade incluídos:
- Navegação por teclado
- Leitores de tela compatíveis
- Contraste adequado
- Textos alternativos para ícones

## 🔧 Personalização

### Configurações visuais

Personalize a experiência visual:
- Modificar cores no `tailwind.config.js`
- Adicionar fontes personalizadas
- Ajustar espaçamentos e tamanhos

### Comportamento da aplicação

Personalize o comportamento:
- Configurar lembretes automáticos
- Modificar critérios de ordenação
- Adicionar campos personalizados

## 📱 Aplicativo Web Progressivo (PWA)

### Recursos offline

O TaskFlow funciona completamente offline:
- Todas as funcionalidades disponíveis sem internet
- Sincronização automática quando online
- Cache inteligente de recursos

### Instalação como app

Instale o TaskFlow como um aplicativo:
- Chrome: Menu → Instalar TaskFlow
- Firefox: Menu → Instalar aplicativo web
- Funciona como app nativo no desktop

## 🆘 Suporte e Ajuda

### Documentação integrada

- Guias contextuais em cada funcionalidade
- Tooltips informativos
- Links para documentação detalhada

### Comunidade

- [Issues no GitHub](@https://github.com/ohugods/taskflow/issues)
- [Discussões da comunidade](@https://github.com/ohugods/taskflow/discussions)
- [Wiki do projeto](@https://github.com/ohugods/taskflow/wiki)

Para problemas específicos, consulte [Solução de Problemas](./troubleshooting.md).
