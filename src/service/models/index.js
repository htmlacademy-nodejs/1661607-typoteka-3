'use strict';

const {Model} = require(`sequelize`);
const {Aliase} = require(`../../const`);
const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineUser = require(`./user`);


const defineModels = (sequelize) => {

  class ArticleCategories extends Model {}

  ArticleCategories.init({}, {
    sequelize,
    modelName: `ArticleCategories`,
    tableName: `article_categories`
  });

  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`, onDelete: `cascade`});
  Comment.belongsTo(Article, {as: Aliase.ARTICLES, foreignKey: `articleId`});

  Article.belongsToMany(Category, {through: ArticleCategories, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategories, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategories, {as: Aliase.ARTICLE_CATEGORIES, onDelete: `restrict`}); // ??? не работает  onDelete: `restrict`

  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `userId`, onDelete: `cascade`});
  Article.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`, onDelete: `cascade`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  return {Category, Comment, Article, ArticleCategories, User};
};

module.exports = defineModels;
