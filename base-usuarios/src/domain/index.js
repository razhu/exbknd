'use strict';

const debug = require('debug')('base:domain');
const db = require('../infrastructure');
const { config, errors } = require('common');
const util = require('./lib/util');
const path = require('path');
const Logs = require('app-logs');
const Params = require('app-params');

module.exports = async function () {
  // Obteniendo repositorios de la capa de infrastructura
  let repositories = await db(config.db).catch(errors.handleFatalError);

  // Cargando Parámetros
  repositories.Parametro = await Params(config.db);



  // Iniciando el módulo de logs
  const logs = await Logs(config.db).catch(errors.handleFatalError);

  // Cargando todos los servicios que se encuentran en la carpeta services y en sus subcarpetas, adjuntando logs
  let services = util.loadServices(path.join(__dirname, 'services'), repositories, { exclude: ['index.js'] }, logs);
  debug('Capa del dominio usuarios - Servicios cargados');

  // Cargando modelos de la capa de infrastructura
  services._models = repositories._models;
  services._repositories = repositories;

  return services;
};
