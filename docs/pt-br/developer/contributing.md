# Contributing Guide

Obrigado por considerar contribuir com o TaskFlow! Este documento fornece diretrizes para contribuições.

## 🤝 Como Contribuir

### 1. Fork o Projeto

1. Faça fork do repositório
2. Clone seu fork localmente
3. Crie uma branch para sua feature

```bash
git checkout -b feature/nova-funcionalidade
```

### 2. Faça suas Alterações

- Siga as convenções de código
- Adicione testes para novas funcionalidades
- Mantenha a documentação atualizada

### 3. Teste suas Alterações

```bash
npm run test
npm run lint
npm run type-check
```

### 4. Submeta um Pull Request

1. Commit suas alterações
2. Push para sua branch
3. Abra um Pull Request

## 📋 Convenções de Código

### TypeScript/React
- Use TypeScript para tipagem
- Componentes funcionais com hooks
- Props interface bem definidas
- Nomes descritivos para variáveis

### CSS/Styling
- Use Tailwind CSS
- Classes utilitárias preferidas
- Responsive design obrigatório
- Acessibilidade considerada

### Commits
- Use conventional commits
- Mensagens em inglês
- Descrições claras e concisas

## 🧪 Testes

### Executar Testes
```bash
npm run test          # Testes unitários
npm run test:coverage # Com cobertura
npm run test:ui       # Interface visual
```

### Escrever Testes
- Teste comportamento, não implementação
- Use React Testing Library
- Cobertura mínima de 80%

## 📝 Documentação

### Atualizar Documentação
- Mantenha README atualizado
- Documente novas funcionalidades
- Exemplos de código claros
- Versões em português e inglês

## 🐛 Reportar Bugs

### Antes de Reportar
1. Verifique se já existe uma issue
2. Teste na versão mais recente
3. Reproduza o problema

### Informações Necessárias
- Versão do navegador
- Sistema operacional
- Passos para reproduzir
- Comportamento esperado vs atual

## ✨ Sugerir Funcionalidades

### Processo
1. Abra uma issue com label "enhancement"
2. Descreva a funcionalidade
3. Explique o caso de uso
4. Considere implementação

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a Licença MIT.

## 🙏 Reconhecimentos

Obrigado a todos os contribuidores que ajudam a tornar o TaskFlow melhor!
