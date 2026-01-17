# GLECB — Gerador de Listas de Estados e Cidades Brasileiras (versão Legacy)

O GLECB é uma ferramenta para **geração automática de arquivos JSON** contendo as listas de estados e cidades do Brasil.
Os dados são obtidos diretamente da **API de localidades do IBGE**, de forma otimizada, garantindo informações atualizadas e confiáveis.

## ✨ Características

- **Leve e objetivo:** remove dados desnecessários retornados pela API do IBGE, entregando apenas as informações essenciais para aplicações simples.
- **Dados sempre atualizados:** as listas são geradas a partir da fonte oficial do IBGE no momento da execução.
- **Compatível com aplicações legadas:** implementado utilizando **CommonJS**, facilitando a integração com projetos mais antigos.

## ☑️ Requisitos

- [Node.js](https://nodejs.org/en) >= 10.12.0
- [node-fetch](https://classic.yarnpkg.com/en/package/node-fetch) >= 2.6.7

> **Nota:** caso a aplicação seja feita em **Node.js v20 ou superior**, recomenda-se o uso da [versão 2.0 do GLECB](https://github.com/ThalesMarcel/glecb), que segue os padrões mais modernos do ecossistema JavaScript.

## 🚀 Como usar

Clone o repositório:

```bash
git clone https://github.com/ThalesMarcel/glecb-legacy.git
```

### Execução direta

Execute o script principal para gerar os arquivos JSON:

```bash
node index.js
```

### Execução como módulo

Também pode-se utilizar o GLECB como dependência em outro projeto:

```javascript
const { gerarListas } = require('glecb-legacy');

async function iniciar() {
  await gerarListas();
}

iniciar();
```

> **Nota:** os arquivos `estados.json` e `cidades.json` serão gerados no diretório `./json`, localizado dentro do diretório do GLECB.

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.
Consulte o arquivo [LICENSE](./LICENSE.md) para mais informações.
