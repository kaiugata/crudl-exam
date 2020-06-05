'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Role)
  };
  return User;
};