'use strict';
const {Router} = require(`express`);
const CategoryService = require(`../data-service/category`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const SearchService = require(`../data-service/search`);
const category = require(`./category`);
const article = require(`./article`);
const search = require(`./search`);
const getMockData = require(`../lib/get-mock-data`);


const apiRouter = new Router();
// "объявление роутера вноси внутрь функций, а то потом обожжешься на тестах"
// тут так не выйдет?

const runRouter = async () => {
  const mockData = await getMockData();
  category(apiRouter, new CategoryService(mockData));
  article(apiRouter, new ArticleService(mockData), new CommentService());
  search(apiRouter, new SearchService(mockData));
};

module.exports = {apiRouter, runRouter};

