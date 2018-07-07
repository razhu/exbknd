'use strict';

const domain = require('../domain');
const Params = require('app-params');
const Logs = require('app-logs');
const { config } = require('common');
const Api = require('./api');
const Graphql = require('./graphql');
const { mergeGraphql } = require('./lib/util');

module.exports = async function setupModule () {
  try {
    // Cargando Capa del dominio
    let services = await domain(config.db);

    // Agregando parámetros a los servicios
    services.Parametro = await Params(config.db);

    // Agregando Logs a los servicios
    services.Log = await Logs(config.db);


    // Cargando API-REST
    const api = Api(services);

    // Cargando GRAPHQL
    let graphql = Graphql(services);

    // Uniendo Graphql de usuarios con Graphql de parámetros
    mergeGraphql(graphql, services.Parametro.graphql, ['DateP']);

    // Uniendo Graphql de usuarios con Graphql de Logs
    mergeGraphql(graphql, services.Log.graphql, ['DateL']);



    return {
      services,
      api,
      graphql,
      _models: services._models,
      _repositories: services._repositories
    };
  } catch (err) {
    throw new Error(`Error al instanciar el módulo de usuarios: ${err.message}`);
  }
};
