'use strict';
const {Router} = require(`express`);
const CategoryService = require(`../data-service/category`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const SearchService = require(`../data-service/search`);
const category = require(`./category`);
const article = require(`./article`);
const search = require(`./search`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);


const runRouter = async () => {
  defineModels(sequelize);

  const apiRouter = new Router();

  category(apiRouter, new CategoryService(sequelize));
  article(apiRouter, new ArticleService(sequelize), new CommentService(sequelize));
  search(apiRouter, new SearchService(sequelize));

  return apiRouter;
};

module.exports = {runRouter};


