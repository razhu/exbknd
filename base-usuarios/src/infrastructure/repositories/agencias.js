'use strict';

const { getQuery, errorHandler } = require('../lib/util');
const { deleteItemModel } = require('../lib/queries');

module.exports = function entidadesRepository (models, Sequelize) {
  const { agencias } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    return agencias.findAndCountAll(query);
  }

  function findById (id) {
    return agencias.findOne({
      where: {
        id
      }
    });
  }
  return {
    findAll,
    findById
  };
};
