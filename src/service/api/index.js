'use strict';


const {Router} = require(`express`);
const CategoryService = require(`../data-service/category`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);


const getMockData = require(`../lib/get-mock-data`);
const category = require(`./category`);
const article = require(`./article`);
const search = require(`./search`);
const SearchService = require(`../data-service/search`);


const apiRouter = new Router();

const api = async () => {
  const mockData = await getMockData();
  category(apiRouter, new CategoryService(mockData));
  article(apiRouter, new ArticleService(mockData), new CommentService());
  search(apiRouter, new SearchService(mockData));

};

api();

module.exports = apiRouter;
