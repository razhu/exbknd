'use strict';

const debug = require('debug')('base:api:public');
const { generateToken, generateTokenSolicitante } = require('../lib/auth');

module.exports = services => {
  async function sucursales (req, res, next) {

    const { Agencia } = services;
    const { ci } = req.params;
    const { fechaNacimiento, complemento } = req.query;

    let misSucus;
    try {
      misSucus = await Agencia.findAll();
      // misSucus = [
      //   {
      //     nombre: 'Suc1',
      //     tel: '34343'
      //   },
      //   {
      //     nombre: 'Suc2',
      //     tel: '44444'
      //   }
      // ];
    } catch (e) {
      return next(e);
    }

    res.send(misSucus.data.rows);
  }
  async function sucursalesId (req, res, next) {

    const { Agencia } = services;
    const { id } = req.params;

    let misSucus;
    try {
      misSucus = await Agencia.findById(parseInt(id));
    } catch (e) {
      return next(e);
    }

    res.send(misSucus);
  }

  return {
    sucursales,
    sucursalesId
  };
};
