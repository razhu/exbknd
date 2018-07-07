'use strict';

// Definiendo asociaciones de las tablas
module.exports = function associations (models) {
  const {
    roles,
    usuarios,
    entidades,
    modulos,
    permisos,
    personas
  } = models;

  // Asociaciones tabla usuarios
  usuarios.belongsTo(entidades, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad' });
  entidades.hasMany(usuarios, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad' });

  usuarios.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(usuarios, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });

  usuarios.belongsTo(personas, { foreignKey: { name: 'id_persona', allowNull: false }, as: 'persona' });
  personas.hasMany(usuarios, { foreignKey: { name: 'id_persona', allowNull: false }, as: 'persona' });

  // Asociaciones tablas permisos - roles
  permisos.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(permisos, { foreignKey: { name: 'id_rol', allowNull: false } });

  // Asociaciones tablas permisos - modulos
  permisos.belongsTo(modulos, { foreignKey: { name: 'id_modulo', allowNull: false }, as: 'modulo' });
  modulos.hasMany(permisos, { foreignKey: { name: 'id_modulo', allowNull: false } });

  // Asociaciones tablas modulos - sección
  modulos.belongsTo(modulos, { foreignKey: 'id_modulo' });
  modulos.hasMany(modulos, { foreignKey: 'id_modulo' });
  modulos.belongsTo(modulos, { foreignKey: 'id_seccion' });
  modulos.hasMany(modulos, { foreignKey: 'id_seccion' });

  return models;
};
