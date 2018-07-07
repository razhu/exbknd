'use strict';

const publicApi = require('./public');
const system = require('./system');

module.exports = function setupApi (services) {
  return {
    public: publicApi(services),
    system: system(services)
  };
};
