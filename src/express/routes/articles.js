'use strict';

const {Router} = require(`express`);
const {Template, ARTICLE_DATE_FORMAT} = require(`../../const`);
const {getDate, asyncHandlerWrapper, prepareErrors, createImageUploader, adminMiddleware, redirectWithErrors, getErrorsFromQuery} = require(`../../utils`);
const api = require(`../api`);
const {createMainHandler} = require(`./route-utils`);

const csrf = require(`csurf`);
const csrfProtection = csrf();

const ArticleRoute = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ID: `/:id`,
  COMMENTS: `/:id/comments`,
  BACK: `/back`
};

const UPLOAD_DIR = `articles`;


const getCheckedCategories = (allCategories, checkedIds) => allCategories.map((item) => ({...item, checked: checkedIds.some((id) => +id === item.id)}));


const ensureArray = (value) => Array.isArray(value) ? value : [value];


const upload = createImageUploader(UPLOAD_DIR);


const articlesRouter = new Router();


articlesRouter.post(ArticleRoute.ADD, upload.single(`upload`), csrfProtection, async (req, res) => {
  const {body, file} = req;
  const {title, announce, fullText, category} = body;

  const articleData = {
    picture: file ? file.filename : ``,
    title, announce, fullText,
    categories: ensureArray(category),
    comments: []
  };

  try {
    await api.postArticle(articleData);
    res.redirect(`/my`);
  } catch (err) {
    const allCategories = await api.getCategories();
    const categories = getCheckedCategories(allCategories, ensureArray(category));

    const errors = prepareErrors(err);

    res.render(Template.POST, {article: articleData, categories, errors, csrfToken: req.csrfToken()});
  }
});


articlesRouter.post(ArticleRoute.EDIT, upload.single(`upload`), csrfProtection, async (req, res) => {
  const {id} = req.params;
  const {body, file} = req;
  const {title, announce, fullText, category, comments} = body;
  const articleData = {
    picture: file ? file.filename : body.photo,
    title, announce, fullText,
    categories: ensureArray(category),
    comments
  };


  try {
    await api.putArticle(id, articleData);
    res.redirect(`/my`);
  } catch (err) {

    const allCategories = await api.getCategories();
    const categories = getCheckedCategories(allCategories, ensureArray(category));
    const errors = prepareErrors(err);

    res.render(Template.EDIT, {id, article: articleData, categories, errors, csrfToken: req.csrfToken()});
  }
});


articlesRouter.get(ArticleRoute.CATEGORY, csrfProtection, asyncHandlerWrapper(createMainHandler(api)));


articlesRouter.get(ArticleRoute.ADD, adminMiddleware, csrfProtection, asyncHandlerWrapper(async (req, res) => {

  const allCategories = await api.getCategories();

  const categories = getCheckedCategories(allCategories, []);
  res.render(Template.POST, {article: {}, categories, csrfToken: req.csrfToken()});


}));

articlesRouter.get(ArticleRoute.EDIT, adminMiddleware, csrfProtection, asyncHandlerWrapper(async (req, res) => {
  const {id} = req.params;
  const article = await api.getOneArticles(id);
  const allCategories = await api.getCategories();

  const categories = getCheckedCategories(allCategories, article.categories.map((item) => item.id));

  res.render(Template.EDIT, {id, article, categories, csrfToken: req.csrfToken()});
}));


articlesRouter.get(ArticleRoute.ID, csrfProtection, asyncHandlerWrapper(async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;
  const back = req.header(`Referer`) || `/`;

  const errors = getErrorsFromQuery(req);


  const rawArticle = await api.getOneArticles(id);
  const allCategories = await api.getCategories(true);

  const rawComments = await api.getCommentsByArticleId(id);

  const needCategories = rawArticle.categories.map((item) => item.name);

  const categories = allCategories.filter((item) => needCategories.includes(item.name));
  const article = {...rawArticle, date: getDate(rawArticle.createdAt, ARTICLE_DATE_FORMAT)};
  const comments = rawComments.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));

  res.render(Template.POST_DETAIL, {article, categories, comments, errors, user, csrfToken: req.csrfToken(), back});
}));


articlesRouter.post(ArticleRoute.COMMENTS, upload.single(`upload`), csrfProtection, async (req, res) => {
  const {id} = req.params;

  const {user} = req.session;

  const data = {text: req.body.text, userId: user.id};


  try {
    await api.postComment(id, data);
    res.redirect(`/articles/${id}`);

  } catch (err) {
    redirectWithErrors(res, err, `/articles/${id}`);
  }

});

module.exports = articlesRouter;
