# Guia de Instalação

Este guia irá ajudá-lo a instalar e configurar o TaskFlow em seu ambiente de desenvolvimento.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- **Node.js** 18.x ou superior
- **npm** (vem com o Node.js) ou **yarn**
- **Git** para clonar o repositório

### Verificando as Instalações

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version
```

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/ohugods/TaskFlow.git
cd TaskFlow
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:5173](http://localhost:5173).

## 🔧 Configuração Adicional

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto se necessário:

```env
VITE_APP_TITLE=TaskFlow
VITE_APP_VERSION=1.0.0
```

### Configuração do Editor

Recomendamos usar o VS Code com as seguintes extensões:

- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

## 🐛 Solução de Problemas

### Problemas Comuns

**Erro: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Erro: "Port already in use"**
```bash
npm run dev -- --port 3000
```

**Erro de TypeScript**
```bash
npm run type-check
```

## 📚 Próximos Passos

Após a instalação bem-sucedida:

1. Leia o [Guia de Início Rápido](quick-start.md)
2. Explore as [Funcionalidades](../user-guide/features.md)
3. Consulte a [Estrutura do Projeto](../developer/project-structure.md)

## 🤝 Suporte

Se você encontrar problemas durante a instalação:

1. Verifique se todos os pré-requisitos estão instalados
2. Consulte a seção de solução de problemas acima
3. Abra uma [issue no GitHub](https://github.com/ohugods/TaskFlow/issues)
4. Entre em contato através do [LinkedIn](https://linkedin.com/in/hugods)
