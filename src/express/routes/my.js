'use strict';

const {Router} = require(`express`);
const {Template, ARTICLE_DATE_FORMAT} = require(`../../const`);
const {asyncHandlerWrapper, adminMiddleware, getDate, redirectWithErrors, getErrorsFromQuery} = require(`../../utils`);
const api = require(`../api`);

const csrf = require(`csurf`);
const csrfProtection = csrf();


const MyRoute = {
  MAIN: `/`,
  ARTICLE_DELETE: `/articles-delete/:id`,
  COMMENTS: `/comments`,
  COMMENTS_DELETE: `/comments-delete/:id`,
  CATEGORIES: `/categories`,
  CATEGORIES_DELETE: `/categories-delete/:id`,
  CATEGORIES_EDIT: `/categories-edit/:id`,
};

const myRouter = new Router();


myRouter.get(MyRoute.MAIN, adminMiddleware, csrfProtection, asyncHandlerWrapper(async (req, res) => {
  const errors = getErrorsFromQuery(req);
  const {articles: rawArticles} = await api.getAllArticles({});
  const articles = rawArticles.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));
  res.render(Template.MY, {articles, errors, csrfToken: req.csrfToken()});
}));

myRouter.get(MyRoute.ARTICLE_DELETE, adminMiddleware, csrfProtection, (async (req, res) => {
  const userId = req.session.user.id;
  const {id} = req.params;
  try {
    await api.deleteArticle(id, userId);
    res.redirect(`/my`);
  } catch (err) {

    redirectWithErrors(res, err, `/my`);
  }
}));


myRouter.get(MyRoute.COMMENTS, adminMiddleware, csrfProtection, asyncHandlerWrapper(async (req, res) => {

  const errors = getErrorsFromQuery(req);

  const rawComments = await api.getAllComments();
  const comments = rawComments.map((comment) => ({...comment, date: getDate(comment.createdAt, ARTICLE_DATE_FORMAT)}));
  res.render(Template.COMMENTS, {comments, errors, csrfToken: req.csrfToken()});

}));

myRouter.get(MyRoute.COMMENTS_DELETE, adminMiddleware, csrfProtection, (async (req, res) => {
  const userId = req.session.user.id;

  const {id} = req.params;

  try {
    await api.deleteComment(id, userId);
    res.redirect(`/my/comments`);
  } catch (err) {
    redirectWithErrors(res, err, `/my/comments`);
  }
}));


myRouter.get(MyRoute.CATEGORIES, adminMiddleware, csrfProtection, asyncHandlerWrapper(async (req, res) => {

  const errors = getErrorsFromQuery(req);

  const categories = await api.getCategories();
  res.render(Template.ALL_CATEGORIES, {categories, errors, csrfToken: req.csrfToken()});
}));


myRouter.get(MyRoute.CATEGORIES_DELETE, adminMiddleware, csrfProtection, (async (req, res) => {
  const userId = req.session.user.id;
  const {id} = req.params;
  try {
    await api.deleteCategory(id, userId);
    res.redirect(`/my/categories`);
  } catch (err) {
    redirectWithErrors(res, err, `/my/categories`);
  }
}));


myRouter.post(MyRoute.CATEGORIES, csrfProtection, async (req, res) => {
  const userId = req.session.user.id;
  const name = req.body.name;

  try {
    await api.postCategory({name, userId});
    const categories = await api.getCategories();
    res.render(Template.ALL_CATEGORIES, {categories, csrfToken: req.csrfToken()});
  } catch (err) {
    redirectWithErrors(res, err, `/my/categories`);
  }
});


myRouter.post(MyRoute.CATEGORIES_EDIT, csrfProtection, async (req, res) => {
  const userId = req.session.user.id;
  const {id} = req.params;
  const name = req.body.name;

  try {
    await api.putCategory(id, {name, userId});
    res.redirect(`/my/categories`);
  } catch (err) {
    redirectWithErrors(res, err, `/my/categories`);
  }
});

module.exports = myRouter;
