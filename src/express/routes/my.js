'use strict';

const {Router} = require(`express`);
const {sendUrl} = require(`../../utils`);


const MyRoute = {
  MAIN: `/`,
  COMMENTS: `/comments`,
  CATEGORIES: `/categories`
};


const myRouter = new Router();

myRouter.get(MyRoute.MAIN, sendUrl);
myRouter.get(MyRoute.CATEGORIES, sendUrl);
myRouter.get(MyRoute.COMMENTS, sendUrl);

module.exports = myRouter;
