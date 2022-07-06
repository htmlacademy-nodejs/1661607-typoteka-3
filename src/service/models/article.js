'use strict';

const {Model, DataTypes} = require(`sequelize`);

class Article extends Model {}

const defineArticle = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  announce: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fullText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  picture: DataTypes.STRING,
},
{
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});


module.exports = defineArticle;
