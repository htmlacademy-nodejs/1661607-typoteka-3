'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render} = require(`../../utils`);
const api = require(`../api`);


const LIMIT_ARTICLES = 8;


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, render(Template.LOGIN));
mainRouter.get(MainRoute.MAIN, async (req, res) => {

  const page = +req.query.page || 1;

  const offset = (page - 1) * LIMIT_ARTICLES;

  const categories = await api.getCategories(true);
  const {articles, count} = await api.getAllArticles({limit: LIMIT_ARTICLES, offset});

  const totalPage = Math.ceil(+count / LIMIT_ARTICLES);
  const pages = new Array(totalPage).fill(null).map((_, i) => i + 1);
  res.render(Template.MAIN, {title: `Типотека`, articles, count, pages, page, totalPage, categories});
});

mainRouter.get(MainRoute.REGISTER, render(Template.SIGN_UP));

mainRouter.get(MainRoute.SEARCH, async (req, res) => {
  const {title} = req.query;

  if (!title) {
    res.render(Template.SEARCH, {articles: [], title: ``});
  } else {
    try {
      const result = await api.search(title);
      res.render(Template.SEARCH, {articles: result, title});
    } catch (err) {
      res.render(Template.SEARCH, {articles: null, title});
    }
  }
});

module.exports = mainRouter;
