'use strict';

const debug = require('debug')('base:api');
const auth = require('express-jwt');
const { config } = require('common');
const guard = require('express-jwt-permissions')();
const { mergeDeepAll } = require('../lib/util');

module.exports = async function setupApi (app, services, api) {
  debug('Iniciando API-REST');
  if (Array.isArray(api)) {
    api = mergeDeepAll(api);
  }

  // Inicio de sesión
  app.post('/auth', api.public.auth);

  // MÖDULO USUARIOS
  app.use('*', auth(config.auth));
  app.get('/api/system/menu', guard.check(['modulos:read']), api.system.obtenerMenu);
  app.get('/api/system/persona-segip/:ci', guard.check(['serviciosIop:read']), api.system.buscarPersona);
  app.patch('/api/system/cambiar_pass', guard.check(['usuarios:update']), api.system.cambiarContrasena);
  app.patch('/api/system/desactivar_cuenta', guard.check(['usuarios:update']), api.system.desactivarCuenta);

  return app;
};
