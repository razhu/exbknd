'use strict';

const debug = require('debug')('base:service:persona');
module.exports = function userService (repositories, res) {
  const { personas } = repositories;

  async function findAll (params = {}, idRol, idEntidad) {
    debug('Lista de personas|filtros');
    let lista;
    try {
      params['id_entidad'] = idEntidad;

      switch (idRol) {
        case 1: // ROL: SUPERADMIN
          params['id_roles'] = [1, 2, 3];
          params['id_entidad'] = null; // Lista de todas las entidades
          break;
        case 2: // ROL: ADMININSTRADOR
          params['id_roles'] = [2, 3];
          break;
      }

      lista = await personas.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.error(new Error(`Error al obtener la lista de personas`));
    }

    return res.success(lista);
  }

  async function findById (id) {
    debug('Buscando persona por ID');

    let user;
    try {
      user = await personas.findById(id);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.error(new Error(`Usuario ${id} not found`));
    }

    return res.success(user);
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar persona');

    let user;
    try {
      user = await personas.createOrUpdate(data);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.error(new Error(`La persona no pudo ser creado`));
    }

    return res.success(user);
  }

  async function deleteItem (id) {
    debug('Eliminando persona');

    let deleted;
    try {
      deleted = await personas.deleteItem(id);
    } catch (e) {
      return res.error(e);
    }

    if (deleted === -1) {
      return res.error(new Error(`No existe el persona`));
    }

    if (deleted === 0) {
      return res.error(new Error(`La persona ya fue eliminado`));
    }

    return res.success(deleted > 0);
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};
