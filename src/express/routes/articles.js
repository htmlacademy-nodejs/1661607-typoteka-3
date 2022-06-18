'use strict';

const {Router} = require(`express`);
const {sendUrl} = require(`../../utils`);


const ArticleRoute = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ID: `/:id`,
};


const articlesRouter = new Router();

articlesRouter.get(ArticleRoute.CATEGORY, sendUrl);
articlesRouter.get(ArticleRoute.ADD, sendUrl);
articlesRouter.get(ArticleRoute.EDIT, sendUrl);
articlesRouter.get(ArticleRoute.ID, sendUrl);

module.exports = articlesRouter;
