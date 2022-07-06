'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

const defineCategory = (sequelize) => Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

module.exports = defineCategory;
