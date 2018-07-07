'use strict';

const debug = require('debug')('base:app');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const asyncify = require('express-asyncify');
const http = require('http');
const chalk = require('chalk');
const baseUsuarios = require('base-usuarios');
const { errors, config } = require('common');
const api = require('./api');
const graphql = require('./graphql');
const port = process.env.PORT || 3000;
const app = asyncify(express());
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

(async function (app) {
  // Cargando servicios
  let services = {};

  // Cargando módulo de usuarios que tiene servicios, api y graphql
  const usuarios = await baseUsuarios(config.db).catch(errors.handleFatalError);
  services = Object.assign(services, usuarios.services);

  // Iniciando API-REST
  app = await api(app, services, [ usuarios.api ]);

  // Iniciando GRAPHQL
  app = await graphql(app, services, [ usuarios.graphql ]);

  // Express Error Handler
  app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`);

    if (err.message.match(/not found/)) {
      return res.status(404).send({ error: err.message });
    }

    if (err.message.match(/jwt expired/)) {
      return res.status(401).send({ error: 'Su sesión ha expirado, ingrese nuevamente al sistema.' });
    }

    if (err.message.match(/No authorization/)) {
      return res.status(403).send({ error: 'No tiene permisos para realizar esta operación.' });
    }

    if (err.message.match(/EAI_AGAIN/)) {
      return res.status(400).send({ error: 'Uno de los servicios no se encuentra activo en estos momentos, vuelva a intentar dentro de unos minutos.' });
    }

    res.status(500).send({ error: err.message });
  });
})(app);

process.on('uncaughtException', errors.handleFatalError);
process.on('unhandledRejection', errors.handleFatalError);

server.listen(port, () => {
  console.log(`${chalk.green('[base-app]')} server listening on port ${port}`);
});
