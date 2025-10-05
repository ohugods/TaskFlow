# Solução de Problemas

Esta seção aborda problemas comuns que podem ocorrer ao usar o TaskFlow e fornece soluções práticas para resolvê-los.

## Problemas de Instalação

### Erro: "npm install falhou"

**Sintomas:**
- Comando `npm install` retorna erro
- Mensagens sobre dependências não encontradas

**Causas possíveis:**
1. Problemas de conectividade de internet
2. Cache do npm corrompido
3. Versão do Node.js incompatível

**Soluções:**

1. **Verifique a conexão:**
   ```bash
   npm ping
   ```

2. **Limpe o cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Atualize o npm:**
   ```bash
   npm install -g npm@latest
   ```

4. **Verifique a versão do Node.js:**
   ```bash
   node --version  # Deve ser >= 16.0.0
   ```

### Erro: "Porta já em uso"

**Sintomas:**
- Servidor não inicia
- Mensagem: "EADDRINUSE: address already in use"

**Soluções:**

1. **Mate o processo usando a porta:**
   ```bash
   # No Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # No Linux/macOS
   lsof -ti:3000 | xargs kill -9
   ```

2. **Use uma porta diferente:**
   ```typescript
   // Em vite.config.ts
   export default defineConfig({
     server: {
       port: 3001,  // ou outra porta disponível
     }
   })
   ```

## Problemas de Funcionamento

### Tarefas não são salvas

**Sintomas:**
- Tarefas desaparecem após recarregar a página
- Dados não persistem entre sessões

**Causas possíveis:**
1. localStorage desabilitado
2. Navegador em modo privado/incógnito
3. Limpeza de dados do navegador

**Soluções:**

1. **Verifique o localStorage:**
   ```javascript
   // No console do navegador
   console.log(localStorage.getItem('task-manager-tasks'))
   ```

2. **Use um navegador diferente:**
   - Chrome, Firefox, Safari ou Edge

3. **Verifique configurações de privacidade:**
   - Desabilite "Bloquear todos os cookies"
   - Permita cookies de terceiros

### Interface não carrega

**Sintomas:**
- Página em branco
- Erro 404 ou 500
- Console mostra erros de JavaScript

**Soluções:**

1. **Verifique o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # Deve mostrar "Local: http://localhost:3000"
   ```

2. **Limpe o cache do navegador:**
   - Ctrl+Shift+R (recarregar forçado)
   - Limpe cookies e cache

3. **Verifique erros no console:**
   - Abra DevTools (F12)
   - Verifique a aba Console para erros

### Problemas de data/horário

**Sintomas:**
- Datas aparecem incorretas
- Tarefas marcadas como "atrasadas" quando não estão
- Fuso horário incorreto

**Causa:**
- Configurações de timezone do sistema

**Soluções:**

1. **Verifique configuração de timezone:**
   ```bash
   # No Linux/macOS
   date

   # No Windows
   tzutil /g
   ```

2. **Sincronize o horário:**
   - Windows: Configurações > Hora e Idioma > Data e Hora
   - Linux/macOS: Use NTP para sincronização automática

## Problemas de Performance

### Aplicação lenta

**Sintomas:**
- Interface responde lentamente
- Animações travam
- Alto uso de CPU

**Causas possíveis:**
1. Muitas tarefas carregadas
2. Problemas de memória
3. Extensões do navegador

**Soluções:**

1. **Otimize número de tarefas:**
   - Mantenha apenas tarefas ativas
   - Use filtros para reduzir lista visível
   - Arquive tarefas antigas periodicamente

2. **Feche outras abas/aplicações:**
   - Libere memória do navegador
   - Desabilite extensões desnecessárias

3. **Reinicie o navegador:**
   - Fecha todas as abas
   - Reabra apenas o TaskFlow

### Alto consumo de bateria (mobile)

**Soluções:**
1. Reduza animações no navegador
2. Use modo de economia de energia
3. Feche outras aplicações em segundo plano

## Problemas de Compatibilidade

### Navegadores não suportados

**Navegadores recomendados:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Navegadores com problemas conhecidos:**
- ❌ Internet Explorer (não suportado)
- ⚠️ Opera (pode ter problemas menores)

**Solução:**
- Use um navegador recomendado
- Atualize seu navegador para a versão mais recente

## Problemas de Dados

### Dados corrompidos

**Sintomas:**
- Tarefas aparecem corrompidas
- Aplicação não carrega dados
- Erros no console relacionados a JSON

**Soluções:**

1. **Exporte dados atuais:**
   ```javascript
   // No console do navegador
   JSON.stringify(JSON.parse(localStorage.getItem('task-manager-tasks')), null, 2)
   ```

2. **Limpe dados corrompidos:**
   ```javascript
   localStorage.removeItem('task-manager-tasks')
   location.reload()
   ```

3. **Restaure dados:**
   - Recrie tarefas importantes manualmente
   - Use backups se disponíveis

### Sincronização entre dispositivos

**Nota:** O TaskFlow atualmente não suporta sincronização entre dispositivos. Cada dispositivo mantém sua própria lista de tarefas.

**Para sincronização:**
1. Use a mesma conta de navegador (se suportado)
2. Mantenha backups manuais dos dados
3. Considere usar serviços de sincronização externos

## Problemas de Desenvolvimento

### Erros de compilação

**Sintomas:**
- `npm run build` falha
- Erros de TypeScript
- Problemas de linting

**Soluções:**

1. **Verifique tipos:**
   ```bash
   npm run type-check
   ```

2. **Corrija problemas de linting:**
   ```bash
   npm run lint:fix
   ```

3. **Atualize dependências:**
   ```bash
   npm update
   ```

### Testes falhando

**Sintomas:**
- `npm run test` retorna erros
- Cobertura baixa

**Soluções:**

1. **Execute testes específicos:**
   ```bash
   npm run test -- --run src/utils/dateUtils.test.ts
   ```

2. **Verifique cobertura:**
   ```bash
   npm run test:coverage
   ```

3. **Debug de testes:**
   ```bash
   npm run test:ui
   ```

## Obtendo Ajuda

### Recursos de auto-ajuda

1. **Documentação**: Leia todos os guias disponíveis em `/docs`
2. **Código fonte**: Examine os arquivos em `/src` para entender o funcionamento
3. **Issues existentes**: Verifique se seu problema já foi reportado

### Reportando bugs

Se nenhuma solução acima funcionar:

1. **Abra uma issue no GitHub:**
   - Vá para [@https://github.com/ohugods/taskflow/issues](@https://github.com/ohugods/taskflow/issues)
   - Clique em "New Issue"
   - Escolha o template apropriado (Bug Report)
   - Preencha todos os campos solicitados

2. **Informações importantes para incluir:**
   - Versão do TaskFlow
   - Navegador e versão
   - Sistema operacional
   - Passos para reproduzir o problema
   - Screenshots (se aplicável)
   - Console errors (copie do DevTools)

### Contribuindo com soluções

Se você encontrou e resolveu um problema:

1. **Documente a solução** neste arquivo
2. **Reporte o bug** mesmo que tenha resolvido
3. **Considere contribuir** com uma correção no código

## Manutenção Preventiva

### Boas práticas

1. **Mantenha backups regulares** dos seus dados
2. **Atualize o navegador** regularmente
3. **Monitore o desempenho** da aplicação
4. **Revise tarefas periodicamente** para manter a lista limpa
5. **Use filtros** para melhorar performance com muitas tarefas

### Verificações periódicas

- ✅ Teste funcionalidades principais mensalmente
- ✅ Verifique compatibilidade com novos navegadores
- ✅ Monitore consumo de recursos
- ✅ Faça backup dos dados importantes

Seguindo este guia, você conseguirá resolver a maioria dos problemas comuns do TaskFlow. Para questões específicas não cobertas aqui, não hesite em abrir uma issue na comunidade! 🚀
