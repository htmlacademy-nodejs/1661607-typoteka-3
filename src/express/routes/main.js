'use strict';

const {Router} = require(`express`);
const {sendUrl} = require(`../../utils`);


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, sendUrl);
mainRouter.get(MainRoute.MAIN, sendUrl);
mainRouter.get(MainRoute.REGISTER, sendUrl);
mainRouter.get(MainRoute.SEARCH, sendUrl);


module.exports = mainRouter;
