'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render, asyncHandlerWrapper} = require(`../../utils`);
const api = require(`../api`);
const {createMainHandler} = require(`./route-utils`);


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, asyncHandlerWrapper(render(Template.LOGIN)));

mainRouter.get(MainRoute.MAIN, asyncHandlerWrapper(createMainHandler(api)));

mainRouter.get(MainRoute.REGISTER, asyncHandlerWrapper(render(Template.SIGN_UP)));

mainRouter.get(MainRoute.SEARCH, asyncHandlerWrapper(async (req, res) => {
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
}));

module.exports = mainRouter;
