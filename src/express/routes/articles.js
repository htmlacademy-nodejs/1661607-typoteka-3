'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {getDate, asyncHandlerWrapper, prepareErrors} = require(`../../utils`);
const api = require(`../api`);

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {createMainHandler} = require(`./route-utils`);


const ARTICLE_DATE_FORMAT = `DD.MM.YYYY, HH:MM`;


const ArticleRoute = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ID: `/:id`,
  COMMENTS: `/:id/comments`
};

const UPLOAD_DIR = `../upload/img`;


const getStringQuery = (rout, query) => `${rout}?${new URLSearchParams(query).toString()}`;


const getCheckedCategories = (allCategories, checkedIds) => allCategories.map((item) => ({...item, checked: checkedIds.some((id) => +id === item.id)}));


const ensureArray = (value) => Array.isArray(value) ? value : [value];


const destination = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const name = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${name}.${extension}`);
  }
});

const upload = multer({storage});


const articlesRouter = new Router();


articlesRouter.post(ArticleRoute.ADD, upload.single(`upload`), async (req, res) => {
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

    res.render(Template.POST, {article: articleData, categories, errors});
  }
});


articlesRouter.post(ArticleRoute.EDIT, upload.single(`upload`), async (req, res) => {
  const {id} = req.params;
  const {body, file} = req;
  const {title, announce, fullText, category, comments} = body;
  const articleData = {
    picture: file ? file.filename : body[`photo`],
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

    res.render(Template.EDIT, {id, article: articleData, categories, errors});
  }
});


articlesRouter.get(ArticleRoute.CATEGORY, asyncHandlerWrapper(createMainHandler(api)));


articlesRouter.get(ArticleRoute.ADD, asyncHandlerWrapper(async (req, res) => {

  const allCategories = await api.getCategories();

  const categories = getCheckedCategories(allCategories, []);
  res.render(Template.POST, {article: {}, categories});


}));

articlesRouter.get(ArticleRoute.EDIT, asyncHandlerWrapper(async (req, res) => {
  const {id} = req.params;
  const article = await api.getOneArticles(id);
  const allCategories = await api.getCategories();

  const categories = getCheckedCategories(allCategories, article.categories.map((item) => item.id));

  res.render(Template.EDIT, {id, article, categories});
}));


articlesRouter.get(ArticleRoute.ID, asyncHandlerWrapper(async (req, res) => {
  const {id} = req.params;

  const err = req.query.err;
  const errors = err ? err.split(`\n`) : [];


  const rawArticle = await api.getOneArticles(id);
  const allCategories = await api.getCategories(true);

  const rawComments = await api.getCommentsByArticleId(id);

  const needCategories = rawArticle.categories.map((item) => item.name);

  const categories = allCategories.filter((item) => needCategories.includes(item.name));
  const article = {...rawArticle, date: getDate(rawArticle.createdAt, ARTICLE_DATE_FORMAT)};
  const comments = rawComments.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));

  res.render(Template.POST_DETAIL, {article, categories, comments, errors});
}));

module.exports = articlesRouter;


articlesRouter.post(ArticleRoute.COMMENTS, upload.single(`upload`), async (req, res) => {
  const {id} = req.params;


  try {
    await api.postComment(id, req.body);
    res.redirect(`/articles/${id}`);

  } catch (err) {
    const errors = {err: err.response.data};
    const redirectUrl = getStringQuery(`/articles/${id}`, errors).toString();
    res.redirect(redirectUrl);
  }

});

