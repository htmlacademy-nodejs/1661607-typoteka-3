'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render} = require(`../../utils`);


const ArticleRoute = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ID: `/:id`,
};


const articlesRouter = new Router();

articlesRouter.get(ArticleRoute.CATEGORY, render(Template.ARTICLES_BY_CATEGORY));
articlesRouter.get(ArticleRoute.ADD, render(Template.POST));
articlesRouter.get(ArticleRoute.EDIT, render(Template.POST));
articlesRouter.get(ArticleRoute.ID, render(Template.POST_DETAIL));

module.exports = articlesRouter;
