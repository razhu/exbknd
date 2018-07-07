'use strict';

const debug = require('debug')('base:api:system');
const { userData, generateToken } = require('../lib/auth');

module.exports = services => {
  // Obteniendo menú y permisos de un usuario - Permiso: ['modulos:read']
  async function obtenerMenu (req, res, next) {
    debug('Obteniendo menú y permisos');
    const { Modulo, Parametro } = services;
    let user = await userData(req, services);
    let menu;
    let token;
    let permisos = {};

    try {
      // Obteniendo menu
      menu = await Modulo.getMenu(user.id_rol);
      let permissions = menu.data.permissions;
      menu = menu.data.menu;

      // Generando token
      token = await generateToken(Parametro, user.usuario, permissions);

      // Formateando permisos
      permissions.map(item => (permisos[item] = true));
    } catch (e) {
      return next(e);
    }

    res.send({
      permisos,
      menu,
      token
    });
  }

  // cambiar contrasena - Permiso: ['usuarios:update']
  async function cambiarContrasena (req, res, next) {
    debug('Cambiar contraseña de usuario');
    const { Usuario } = services;
    const { password, newPassword } = req.body;

    try {
      let _user = await userData(req, services);
      let user = await Usuario.userExist(_user.usuario, password);
      if (user.code === 1) {
        await Usuario.update({
          id: _user.id,
          contrasena: newPassword
        });
        res.send({ message: 'Contraseña cambiada correctamente' });
      } else {
        res.send({ error: 'Su contraseña anterior es incorrecta' });
      }
    } catch (e) {
      return next(e);
    }
  }

  // desactivar cuenta - Permisos: ['usuarios:update']
  async function desactivarCuenta (req, res, next) {
    debug('Desactivar cuenta de usuario');
    const { Usuario } = services;
    const { password } = req.body;
    try {
      let _user = await userData(req, services);
      let user = await Usuario.userExist(_user.usuario, password);
      if (user.code === 1) {
        await Usuario.update({
          id: _user.id,
          estado: 'INACTIVO'
        });
        res.send({ message: '¡Cuenta desactivada!' });
      } else {
        res.send({ error: 'Su contraseña es incorrecta' });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function buscarPersona (req, res, next) {
    debug('Buscando persona en SEGIP');
    const { Iop } = services;
    const { ci } = req.params;
    const { fechaNacimiento, complemento } = req.query;

    let persona;
    try {
      persona = await Iop.segip.buscarPersona(ci, fechaNacimiento, complemento);
    } catch (e) {
      return next(e);
    }

    res.send(persona);
  }

  return {
    obtenerMenu,
    cambiarContrasena,
    desactivarCuenta,
    buscarPersona
  };
};
