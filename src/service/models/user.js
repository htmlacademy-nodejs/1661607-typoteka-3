"use strict";

const {DataTypes, Model} = require(`sequelize`);


class User extends Model {}

const defineUser = (sequelize) => User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: DataTypes.STRING,
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

module.exports = defineUser;
