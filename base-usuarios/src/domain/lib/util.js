'use strict';

const fs = require('fs');
const path = require('path');
const Response = require('./response');
const { array } = require('common');
let res;

/**
 * Cargando los repositorios en la carpeta especificada
 *
 * @param {string} PATH: Path del directorio de donde se cargará los modelos del sistema
 * @param {object} models: Objeto con todos los modelos de la bd
 * @param {object} res: objeto con respuestas predeterminadas
 * @param {object} opts: Json de configuración
 */
function loadServices (PATH, repositories, opts = {}, logs) {
  if (!res) {
    res = Response(logs);
  }
  let files = fs.readdirSync(PATH);
  let services = {};

  if (opts.exclude) {
    array.removeAll(opts.exclude, files);
  }

  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      services[file] = loadServices(pathFile, repositories, opts, logs);
    } else {
      file = file.replace('.js', '');
      services[file] = require(pathFile)(repositories, res);
    }
  });

  return services;
}

module.exports = {
  loadServices
};
