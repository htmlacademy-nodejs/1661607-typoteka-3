'use strict';

const {Model} = require(`sequelize`);
const {Aliase} = require(`../../const`);
const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);


const defineModels = (sequelize) => {

  class ArticleCategories extends Model {}

  ArticleCategories.init({}, {sequelize});

  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  Article.belongsToMany(Category, {through: ArticleCategories, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategories, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategories, {as: Aliase.ARTICLE_CATEGORIES});

  return {Category, Comment, Article, ArticleCategories};
};

module.exports = defineModels;
