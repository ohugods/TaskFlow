# Configuração

Esta seção explica como configurar e personalizar o TaskFlow para atender às suas necessidades específicas.

## Configuração inicial

O TaskFlow é projetado para funcionar "out of the box" sem necessidade de configuração complexa. No entanto, você pode personalizar vários aspectos da aplicação.

## Variáveis de ambiente

Atualmente, o TaskFlow não requer variáveis de ambiente obrigatórias. Todas as configurações são feitas através de arquivos de configuração.

## Arquivos de configuração

### 1. `package.json`

O arquivo `package.json` contém configurações importantes:

```json
{
  "name": "taskflow",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  }
}
```

### 2. `vite.config.ts`

Configurações do servidor de desenvolvimento:

```typescript
export default defineConfig({
  server: {
    port: 3000,
    open: true,        // Abre automaticamente no navegador
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
})
```

### 3. `tsconfig.json`

Configurações do TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Personalização de estilos

### Modificando cores

Para alterar a paleta de cores, edite o arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... outras cores
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

### Adicionando fontes personalizadas

Edite o arquivo `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Configuração de desenvolvimento

### ESLint e Prettier

O projeto inclui configurações padrão para:

- **ESLint**: Verificação de qualidade de código
- **Prettier**: Formatação automática

Para modificar as regras:

```bash
# Verificar problemas de linting
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

### Configuração do editor

Para melhor experiência de desenvolvimento, configure seu editor:

#### VS Code

Instale as seguintes extensões:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Hero

Adicione ao `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

## Configuração de produção

### Build otimizado

Para produção, o TaskFlow gera arquivos otimizados:

```bash
npm run build
```

Os arquivos são gerados em `dist/` com:
- JavaScript minificado e separado por chunks
- CSS otimizado e com purge do Tailwind
- Assets com hashes para cache busting

### Deploy

#### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configurações no `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

#### Netlify

Configurações no `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Configurações avançadas

### Modificar configurações de teste

O arquivo `vite.config.ts` inclui configurações de teste:

```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
}
```

### Configurar cobertura de testes

Para relatórios detalhados de cobertura:

```bash
npm run test:coverage
```

O relatório será gerado em `coverage/lcov-report/index.html`.

## Solução de problemas de configuração

### Problema: Porta já em uso

```bash
# Modificar porta no vite.config.ts
server: {
  port: 3001,  // alterar para 3001, 3002, etc.
}
```

### Problema: Permissões de instalação

```bash
# No Linux/macOS
sudo npm install

# Ou usar yarn
yarn install
```

### Problema: Cache corrompido

```bash
# Limpar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Próximos passos

Após configurar o TaskFlow:

1. Explore [Funcionalidades Avançadas](../user-guide/features.md)
2. Aprenda sobre [Atalhos de Teclado](../user-guide/interface.md#atalhos-de-teclado)
3. Configure [Integrações](../api/overview.md) se necessário
4. Contribua com [Melhorias](../developer/contributing.md)

Para dúvidas específicas, consulte a [seção de troubleshooting](../user-guide/troubleshooting.md) ou abra uma [issue](@https://github.com/ohugods/taskflow/issues).
