'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {asyncHandlerWrapper, prepareErrors} = require(`../../utils`);
const api = require(`../api`);


const MyRoute = {
  MAIN: `/`,
  COMMENTS: `/comments`,
  CATEGORIES: `/categories`
};


const createCommentWithTitle = (comments, articleTitle) => comments.map((item) => ({...item, articleTitle}));

const myRouter = new Router();


myRouter.get(MyRoute.MAIN, asyncHandlerWrapper(async (req, res) => {
  const {articles} = await api.getAllArticles({});
  res.render(Template.MY, {articles});
}));

myRouter.get(MyRoute.COMMENTS, asyncHandlerWrapper(async (req, res) => {
  const {articles} = await api.getAllArticles({});
  const commentsWitArticleTitle = articles.reduce((acc, item) => ([...acc, ...createCommentWithTitle(item.comments, item.title)]), []);
  res.render(Template.COMMENTS, {comments: commentsWitArticleTitle});
}));


myRouter.get(MyRoute.CATEGORIES, asyncHandlerWrapper(async (req, res) => {
  const categories = await api.getCategories();
  res.render(Template.ALL_CATEGORIES, {categories});
}));


myRouter.post(MyRoute.CATEGORIES, async (req, res) => {

  try {
    await api.postCategory(req.body);
    const categories = await api.getCategories();
    res.render(Template.ALL_CATEGORIES, {categories});
  } catch (err) {
    const categories = await api.getCategories();
    const errors = prepareErrors(err);
    res.render(Template.ALL_CATEGORIES, {categories, errors});
  }


});

module.exports = myRouter;
