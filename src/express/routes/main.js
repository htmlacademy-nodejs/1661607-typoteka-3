'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render} = require(`../../utils`);


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, render(Template.LOGIN));
mainRouter.get(MainRoute.MAIN, render(Template.MAIN, {title: `Типотека`}));
mainRouter.get(MainRoute.REGISTER, render(Template.SIGN_UP));
mainRouter.get(MainRoute.SEARCH, render(Template.SEARCH));

module.exports = mainRouter;
