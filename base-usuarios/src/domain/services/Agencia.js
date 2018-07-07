'use strict';

const debug = require('debug')('base:service:entidad');

module.exports = function entidadService (repositories, res) {
  const { agencias } = repositories;

  async function findAll (params = {}) {
    debug('Lista de agencias|filtros');

    let lista;
    try {
      lista = await agencias.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.error(new Error(`Error al obtener la lista de agencias`));
    }

    return res.success(lista);
  }

  async function findById (id) {
    debug('Buscando agencia por ID');

    let agencia;
    try {
      agencia = await agencias.findById(id);
    } catch (e) {
      return res.error(e);
    }

    if (!agencia) {
      return res.error(new Error(`agencia ${id} not found`));
    }

    return res.success(agencia);
  }

  return {
    findAll,
    findById
  };
};
