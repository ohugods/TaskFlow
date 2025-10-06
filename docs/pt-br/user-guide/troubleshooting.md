# 🐛 Solução de Problemas - TaskFlow

Esta página contém soluções para os problemas mais comuns que podem ocorrer ao usar o TaskFlow. Se seu problema não estiver listado aqui, consulte nossa [seção de suporte](#suporte).

## 🚫 Problemas de Instalação

### Erro: "Node.js não encontrado"
**Sintomas:** Erro "node: command not found" ao executar comandos.

**Soluções:**
1. Verifique se o Node.js está instalado: `node --version`
2. Baixe e instale o Node.js 18+ do site oficial
3. Reinicie o terminal após a instalação
4. Verifique se o PATH está configurado corretamente

### Erro: "npm não encontrado"
**Sintomas:** Erro "npm: command not found".

**Soluções:**
1. npm geralmente vem com Node.js
2. Se não estiver instalado: `npm install -g npm`
3. Verifique a versão: `npm --version`
4. Use yarn como alternativa se preferir

### Erro durante `npm install`
**Sintomas:** Falha ao instalar dependências.

**Soluções:**
```bash
# Limpe cache e reinstale
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Use yarn se npm falhar
yarn install

# Verifique conexão com internet
ping registry.npmjs.org
```

## 🖥️ Problemas na Interface

### Aplicação não carrega
**Sintomas:** Página branca ou erro ao carregar.

**Soluções:**
1. **Limpe cache do navegador:**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (macOS)

2. **Verifique console do navegador:**
   - F12 → Console
   - Procure por erros JavaScript

3. **Desative extensões:**
   - Algumas extensões podem interferir
   - Teste em modo incógnito

4. **Verifique URL:**
   - Certifique-se de estar acessando a URL correta
   - Para desenvolvimento: `http://localhost:5173`

### Botões não funcionam
**Sintomas:** Cliques não produzem efeito.

**Soluções:**
1. Verifique se JavaScript está habilitado
2. Teste em outro navegador
3. Desative temporariamente bloqueadores de anúncios
4. Verifique conflitos com outras extensões

### Layout quebrado/visual distorcido
**Sintomas:** Elementos desalinhados ou sobrepostos.

**Soluções:**
1. **Redimensione a janela do navegador**
2. **Alterne o tema:** Configurações → Tema
3. **Reset zoom:** Ctrl+0 (Windows/Linux) ou Cmd+0 (macOS)
4. **Limpe cache:** Ctrl+Shift+R

## 💾 Problemas com Dados

### Tarefas não são salvas
**Sintomas:** Tarefas desaparecem após recarregar.

**Soluções:**
1. **Verifique localStorage:**
   - F12 → Application/Storage → Local Storage
   - Procure por chave "taskflow-data"

2. **Modo incógnito:**
   - Dados não persistem em modo privado
   - Use janela normal do navegador

3. **Cookies desabilitados:**
   - localStorage requer cookies habilitados
   - Verifique configurações de privacidade

4. **Espaço insuficiente:**
   - Limpe dados do navegador
   - Verifique espaço em disco

### Dados corrompidos
**Sintomas:** Erro ao carregar dados ou comportamento estranho.

**Soluções:**
1. **Exporte dados existentes** (se possível)
2. **Limpe dados da aplicação:**
   ```javascript
   // No console do navegador:
   localStorage.removeItem('taskflow-data')
   location.reload()
   ```
3. **Reimporte dados** do backup
4. **Reinicie o navegador**

### Perda de dados após atualização
**Sintomas:** Dados desaparecem após update.

**Soluções:**
1. **Faça backup antes de atualizar**
2. **Use export/import oficial**
3. **Verifique compatibilidade** entre versões
4. **Contate suporte** se dados forem críticos

## 🔍 Problemas de Busca e Filtros

### Busca não encontra tarefas
**Sintomas:** Busca não retorna resultados esperados.

**Soluções:**
1. **Verifique ortografia** dos termos
2. **Busca é case-insensitive** (não diferencia maiúsculas)
3. **Busca em títulos E descrições**
4. **Use termos mais específicos**

### Filtros não funcionam
**Sintomas:** Filtros não alteram a lista.

**Soluções:**
1. **Verifique se há tarefas** no filtro selecionado
2. **Recarregue a página**
3. **Limpe outros filtros ativos**
4. **Verifique estado das tarefas** (concluída/pendente)

## 📅 Problemas com Datas

### Datas não aparecem corretamente
**Sintomas:** Formatação de data incorreta.

**Soluções:**
1. **Verifique fuso horário** do sistema
2. **Formato local:** Depende das configurações do navegador
3. **Datas ISO:** Sempre salvas em formato UTC
4. **Atualize a página** para refletir mudanças

### Lembretes não funcionam
**Sintomas:** Notificações de data não aparecem.

**Soluções:**
1. **Permissões do navegador:**
   - Clique no cadeado na barra de endereço
   - Permita notificações

2. **Configurações da aplicação:**
   - Configurações → Notificações → Habilitar

3. **Verifique datas:**
   - Certifique-se de que há tarefas com datas futuras

## 🎨 Problemas de Aparência

### Tema não muda
**Sintomas:** Alternância de tema não funciona.

**Soluções:**
1. **Recarregue a página** após mudar tema
2. **Limpe cache:** Ctrl+Shift+R
3. **Verifique localStorage** para configuração de tema
4. **Modo automático:** Pode depender do sistema operacional

### Fontes ou cores incorretas
**Sintomas:** Aparência diferente do esperado.

**Soluções:**
1. **Reset configurações de aparência**
2. **Verifique suporte a CSS** no navegador
3. **Desative extensões** que alteram aparência
4. **Teste em outro navegador**

## 📱 Problemas Mobile

### Interface não responsiva
**Sintomas:** Layout não se adapta à tela.

**Soluções:**
1. **Redimensione a janela** do navegador
2. **Use modo dispositivo** no DevTools
3. **Verifique meta viewport** da página
4. **Atualize para versão mais recente**

### Gestos touch não funcionam
**Sintomas:** Arrastar, tocar não produzem efeito.

**Soluções:**
1. **Toque único primeiro**, depois gestos
2. **Verifique se touch está habilitado**
3. **Teste em dispositivo real** vs emulador
4. **Limpe cache** da aplicação web

## 🔧 Problemas Técnicos

### Aplicação lenta
**Sintomas:** Interface travando ou lenta.

**Soluções:**
1. **Limpe cache do navegador**
2. **Feche outras abas/aplicações**
3. **Verifique uso de memória**
4. **Atualize o navegador**

### Erros JavaScript no console
**Sintomas:** Erros vermelhos no console do navegador.

**Soluções:**
1. **Anote o erro exato**
2. **Verifique se é erro conhecido** nesta documentação
3. **Teste em outro navegador**
4. **Relate o bug** com detalhes

### Conflito com outras extensões
**Sintomas:** Comportamento estranho com certas extensões.

**Soluções:**
1. **Desative extensões uma por uma**
2. **Teste em modo incógnito**
3. **Verifique extensões de produtividade**
4. **Atualize ou remova** extensões problemáticas

## 🌐 Problemas de Rede

### Aplicação offline não funciona
**Sintomas:** Funcionalidades limitadas offline.

**Soluções:**
1. **Service Worker:** Verifique se está registrado
2. **Cache:** Alguns recursos podem precisar de internet
3. **Sincronização:** Dados sincronizam quando volta online
4. **Funcionalidades limitadas** são esperadas offline

### Problemas de sincronização
**Sintomas:** Dados não sincronizam entre dispositivos.

**Soluções:**
1. **Versão atual:** Certifique-se de usar versão mais recente
2. **Conexão estável:** Verifique internet
3. **Dados locais:** Sincronização é manual por enquanto
4. **Backup primeiro:** Sempre faça backup antes

## 🔄 Problemas de Atualização

### Após atualização, dados sumiram
**Sintomas:** Perda de dados após update.

**Soluções:**
1. **Backup obrigatório** antes de atualizar
2. **Versão compatível:** Verifique compatibilidade
3. **Dados migrados:** Algumas atualizações migram dados
4. **Suporte:** Contate se dados forem críticos

### Novos recursos não aparecem
**Sintomas:** Recursos mencionados não estão disponíveis.

**Soluções:**
1. **Hard refresh:** Ctrl+Shift+R ou Cmd+Shift+R
2. **Limpe cache completamente**
3. **Verifique versão** da aplicação
4. **Reinicie o navegador**

## 📞 Suporte e Ajuda Adicional

### Quando procurar ajuda
- Problema persiste após tentar soluções
- Erro específico não documentado
- Dados importantes perdidos
- Comportamento crítico afetado

### Como obter ajuda
1. **Documentação:** Verifique seções relevantes
2. **Issues no GitHub:** Procure problemas similares
3. **Fórum da comunidade:** Pergunte à comunidade
4. **Relatório de bug:** Para problemas técnicos

### Informações úteis para relatar
- **Versão do navegador** e sistema operacional
- **Passos para reproduzir** o problema
- **Comportamento esperado** vs atual
- **Capturas de tela** ou vídeos
- **Logs do console** do navegador

---

## 🚀 Prevenção de Problemas

### Manutenção Regular
- **Atualize regularmente** para correções
- **Faça backup semanal** dos dados
- **Limpe cache** mensalmente
- **Verifique compatibilidade** antes de updates

### Boas Práticas
- **Use navegadores atualizados**
- **Mantenha JavaScript habilitado**
- **Permita notificações** quando solicitado
- **Faça backup** antes de mudanças grandes

### Monitoramento
- **Verifique console** periodicamente
- **Monitore uso de armazenamento**
- **Acompanhe atualizações** do projeto

**💡 Dica:** Muitos problemas são resolvidos simplesmente recarregando a página ou limpando o cache!
