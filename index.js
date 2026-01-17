/**
 * GLECB — Gerador de Listas de Estados e Cidades Brasileiras
 *
 * Versão: 1.1.0
 * Autor: Thales Marcel Souza Silva
 *
 * Gera arquivos JSON contendo listas atualizadas dos estados e cidades do
 * Brasil a partir da API de localidades do IBGE, removendo dados
 * desnecessários presentes nos retornos padrão da API.
 *
 * Compatível com Node.js >= 10.12.0 (CommonJS).
 */

/*************************** Importação de Módulos ****************************/

/** Manipulador de arquivos */
const fs = require('fs').promises;

/**
 *  Um módulo leve que traz o método "window.fetch" para versões do Node.js que
 * ainda não o possuem nativamente.
*/
const fetch = require('node-fetch');

/******************************************************************************/


async function gerarListas() {
  try {
    /**
     * Verifica se o diretório "json" existe no diretório da aplicação.
     * Caso ainda não exista, ele é criado.
     */
    await fs.mkdir('./json', { recursive: true });

    let respostaAPI = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');

    const estados = await respostaAPI.json();

    await fs.writeFile('./json/estados.json', JSON.stringify(estados, ['nome', 'sigla']));

    const matrizCidades = [];

    /**
     *  O laço faz com que cada "linha" de matrizCidades contenha as cidades de um
     * estado brasileiro.
    */
    for (let i = 0; i < estados.length; i++) {
      console.log('Obtendo cidades do estado: ' + estados[i].nome);

      respostaAPI = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estados[i].id + '/municipios?orderBy=nome');

      const dadosCidades = await respostaAPI.json();

      matrizCidades.push(dadosCidades.map(function(cidade) { return cidade.nome; }));
    }

    await fs.writeFile('./json/cidades.json', JSON.stringify(matrizCidades));

    console.log('🆗 Arquivos gerados com sucesso (v1.1 Legacy)!');
  } catch (err) {
    console.error('🆘 Erro:', err.message);
  }
}

module.exports = { gerarListas };

if (require.main === module) {
  gerarListas();
}
