'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    ciudad: {
      type: DataTypes.STRING(150)
    },
    direccion: {
      type: DataTypes.TEXT
    },
    nroCajeros: {
        type: DataTypes.INTEGER
    },
    sueldoCajeros: {
        type: DataTypes.INTEGER
    },
    horasCajeros: {
        type: DataTypes.INTEGER
    },    
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Agencias = sequelize.define('agencias', fields, {
    timestamps: false,
    tableName: 'agencias'
  });

  return Agencias;
};
