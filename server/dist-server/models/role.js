'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});

  Role.associate = function (models) {
    Role.hasMany(models.User);
  };

  return Role;
};

exports["default"] = _default;