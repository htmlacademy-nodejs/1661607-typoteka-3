'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model {}

const defineComment = (sequelize) => Comment.init({
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`
});

module.exports = defineComment;
