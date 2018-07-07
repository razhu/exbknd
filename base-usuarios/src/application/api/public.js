'use strict';

const debug = require('debug')('base:api:public');
const { generateToken, generateTokenSolicitante } = require('../lib/auth');

module.exports = services => {
  async function sucursales (req, res, next) {

    const { Iop } = services;
    const { ci } = req.params;
    const { fechaNacimiento, complemento } = req.query;

    let misSucus;
    try {
      // misSucus = await Iop.segip.buscarmisSucus(ci, fechaNacimiento, complemento);
      misSucus = [
        {
          nombre: 'Suc1',
          tel: '34343'
        },
        {
          nombre: 'Suc2',
          tel: '44444'
        }
      ];
    } catch (e) {
      return next(e);
    }

    res.send(misSucus);
  }

  return {
    sucursales
  };
};
