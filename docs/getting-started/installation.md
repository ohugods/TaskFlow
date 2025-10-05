# Instalação

Esta seção explica como instalar e configurar o TaskFlow em seu ambiente de desenvolvimento.

## Pré-requisitos

Antes de instalar o TaskFlow, certifique-se de que seu sistema atende aos seguintes requisitos:

- **Node.js** versão 16.0.0 ou superior
- **npm** versão 7.0.0 ou superior (ou **yarn** versão 1.22.0 ou superior)
- **Git** para controle de versão

### Verificando os pré-requisitos

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar se o Git está instalado
git --version
```

## Instalação via npm

### 1. Clone o repositório

```bash
git clone @https://github.com/ohugods/taskflow.git
cd taskflow
```

### 2. Instale as dependências

```bash
npm install
```

Isso irá instalar todas as dependências necessárias listadas no `package.json`.

### 3. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
```

O TaskFlow estará disponível em [http://localhost:3000](http://localhost:3000).

## Instalação alternativa com yarn

Se preferir usar o yarn:

```bash
git clone @https://github.com/ohugods/taskflow.git
cd taskflow
yarn install
yarn dev
```

## Estrutura do projeto após instalação

Após a instalação, sua estrutura de diretórios será semelhante a esta:

```
taskflow/
├── docs/                    # Documentação completa
│   ├── README.md           # Visão geral do projeto
│   ├── getting-started/    # Guias de instalação e configuração
│   ├── user-guide/         # Guias para usuários finais
│   ├── developer/          # Documentação técnica
│   ├── api/               # Documentação da API
│   └── changelog/         # Histórico de versões
├── src/                   # Código fonte
│   ├── components/        # Componentes React
│   ├── hooks/            # Custom hooks
│   ├── types/            # Definições TypeScript
│   ├── utils/            # Utilitários e helpers
│   ├── lib/              # Bibliotecas e configurações
│   ├── assets/           # Recursos estáticos
│   ├── styles/           # Estilos customizados
│   └── test/             # Configuração de testes
├── public/               # Arquivos públicos
├── index.html           # Arquivo HTML principal
├── package.json         # Dependências e scripts
├── vite.config.ts       # Configuração do Vite
├── tsconfig.json        # Configuração do TypeScript
└── README.md           # Este arquivo
```

## Scripts disponíveis

Após a instalação, você terá acesso aos seguintes scripts:

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Testes
npm run test         # Executa todos os testes
npm run test:ui      # Interface visual dos testes
npm run test:coverage # Relatório de cobertura

# Qualidade de código
npm run lint         # Verifica problemas de linting
npm run lint:fix     # Corrige problemas automaticamente
npm run type-check   # Verifica tipos TypeScript
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação
```

## Verificação da instalação

Para verificar se a instalação foi bem-sucedida:

1. Execute `npm run dev`
2. Abra [http://localhost:3000](http://localhost:3000) em seu navegador
3. Você deve ver a interface do TaskFlow carregando

Se encontrar algum problema durante a instalação, consulte a seção [Solução de Problemas](../user-guide/troubleshooting.md) ou abra uma [issue](@https://github.com/ohugods/taskflow/issues) no repositório.

## Próximos passos

Após a instalação bem-sucedida:

1. Explore a [Visão Geral do Projeto](../README.md) para entender as funcionalidades
2. Consulte o [Guia de Início Rápido](./quick-start.md) para começar a usar
3. Leia sobre [Configuração](./configuration.md) para personalizar o ambiente
4. Explore o [Guia do Usuário](../user-guide/features.md) para aprender todas as funcionalidades
