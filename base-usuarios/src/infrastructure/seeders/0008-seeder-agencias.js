'use strict';

const { setTimestampsSeeder } = require('../lib/util');
const templateCorreo = require('./templates/correo-tmpl');

let items = [
{
  ciudad: 'La Paz',
  direccion: 'Camacho',
  nroCajeros: 10,
  sueldoCajeros: 10,
  horasCajeros: 10
},
{
  ciudad: 'La Paz',
  direccion: 'Villa Fatima',
  nroCajeros: 8,
  sueldoCajeros: 8,
  horasCajeros: 8
}
];

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('agencias', items, {});
  },

  down (queryInterface, Sequelize) { }
};
