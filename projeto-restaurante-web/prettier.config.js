const config = {
  printWidth: 80, // Limite de caracteres por linha
  tabWidth: 2, // Quantidade de espaços por tabulação
  useTabs: false, // Usa espaços em vez de tabs
  semi: true, // Adiciona ponto e vírgula no final das linhas
  singleQuote: true, // Usa aspas simples ao invés de aspas duplas
  trailingComma: 'es5', // Vírgula no final de objetos e arrays (conforme ES5)
  bracketSpacing: true, // Espaço entre chaves em objetos { foo: bar }
  arrowParens: 'always', // Sempre usa parênteses em arrow functions (ex: (x) => x)
  endOfLine: 'lf', // Usa "LF" como fim de linha (compatível com Unix)
  plugins: ['prettier-plugin-sort-imports'],
  importOrder: ['^react', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true, //Adiciona uma linha em branco entre diferentes grupos de imports.
  importOrderSortSpecifiers: true, //Ordena os itens dentro dos imports com destructuring.
};

export default config;

// ^react: Garante que os imports do React venham primeiro.
// <THIRD_PARTY_MODULES>: Organiza os pacotes de bibliotecas externas (como axios, styled-components).
// ^[./]: Imports relativos (do seu próprio projeto).
