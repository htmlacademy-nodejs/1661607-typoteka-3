'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render} = require(`../../utils`);
const api = require(`../api`);


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, render(Template.LOGIN));
mainRouter.get(MainRoute.MAIN, async (req, res) => {
  const categories = await api.getCategoriesWithCount();
  const articles = await api.getAllArticles();
  res.render(Template.MAIN, {title: `Типотека`, articles, categories});
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
