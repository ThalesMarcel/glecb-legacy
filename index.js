/**
 *  GLECB - Gerador de Listas de Estados e Cidades Brasileiras
 *
 *  Versão: 1.0.6
 *  Autor: Thales Marcel Souza Silva
 *  Data: 19/11/2024
 *
 * CHANGELOG
 *
 * v1.0.0 - 15/08/2021 - versão inicial
 * v1.0.1 - 30/06/2022 - atualização de segurança das dependências
 * v1.0.2 - 07/06/2023 - atualização de segurança das dependências
 * v1.0.3 - 29/06/2023 - atualização de segurança das dependências
 * v1.0.4 - 22/07/2023 - atualização de segurança das dependências
 * v1.0.5 - 17/10/2023 - atualização de segurança das dependências
 * v1.0.6 - 19/11/2024 - atualização de segurança das dependências
 * v1.0.7 - 14/01/2026 - atualização de segurança das dependências
 *
 *  Gerador de listas de estados e cidades em formato JSON, a partir da API de
 * localidades do IBGE, sem o excesso de dados existente nos retornos da API.
 *
 *  Programa escrito em Node.js v16.
 */

/*************************** Importação de Módulos ****************************/

/** manipulador de arquivos */
import * as fs from 'fs';
/** um módulo leve que traz o método "window.fetch" para Node.js */
import fetch from 'node-fetch';

/******************************************************************************/

/************************** Declaração de Variáveis ***************************/

/** URL do JSON a ser baixado */
let url;

/** Recebe os dados brutos obtidos pela função "fetch" */
let resposta;

/** Vetor de estados */
let estados;

/** Vetor temporário de cidades */
let _cidades;

/**
 *  Matriz de cidades, formado pela concatenação dos dados obtidos do vetor
 * "_cidades", nas iterações do bloco de laço
*/
let cidades = [];

/** Chaves do JSON original a serem copiadas para o JSON final */
let chaves;

/** Armazena dados em formato de string JSON */
let str_json;

/** Manipulador de arquivos */
let arquivo;

/******************************************************************************/

/****************** Importar os dados referentes aos estados ******************/

url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
console.log('Obtendo a lista de estados do Brasil...');
resposta = await fetch(url);
estados = await resposta.json();
chaves = ['nome', 'sigla'];
str_json = JSON.stringify(estados, chaves);
console.log('Armazenando a lista de estados no arquivo "estados.json"...');
arquivo = fs.openSync('./json/estados.json', 'w+');
fs.writeFileSync(arquivo, str_json);
fs.closeSync(arquivo);

/******************************************************************************/

/****************** Importar os dados referentes às cidades *******************/

/* Formação da matriz "cidades" */
for (let i = 0; i < estados.length; i++) {
  console.log('Estado: ' + estados[i]['nome'] + '. Obtendo a lista de cidades...');

  url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estados[i]['id'].toString() + '/municipios?orderBy=nome';

  resposta = await fetch(url);
  _cidades = await resposta.json();

  /* Adição de um novo vetor à matriz "cidades" */
  cidades.push(new Array());

  /* Concatenação do vetor de cidades do estado "i" na matriz "cidades" */
  for (let j = 0; j < _cidades.length; j++) {
    cidades[i].push(_cidades[j]['nome']);
  }
}

/* Armazenamento do conteúdo de "cidades" no arquivo "cidades.json" */
str_json = JSON.stringify(cidades);
console.log('Armazenando a lista de cidades no arquivo "cidades.json"...');
arquivo = fs.openSync('./json/cidades.json', 'w+');
fs.writeFileSync(arquivo, str_json);
fs.closeSync(arquivo);
console.log('Armazenamento finalizado!!!');
