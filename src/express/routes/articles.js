'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render, getDate} = require(`../../utils`);
const api = require(`../api`);

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);


const ARTICLE_DATE_FORMAT = `DD.MM.YYYY, HH:MM`;

const ArticleRoute = {
  CATEGORY: `/category/:id`,
  ADD: `/add`,
  EDIT: `/edit/:id`,
  ID: `/:id`,
};

const UPLOAD_DIR = `../upload/img`;


const getStringQuery = (rout, query) => `${rout}?${new URLSearchParams(query).toString()}`;

const getQueriesFromRedirect = (query) => {
  if (!query) {
    return {};
  }

  if (!query.category) {
    return query;
  }

  return {...query, category: query.category.split(`,`)};
};

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
    category: ensureArray(category),
  };

  try {
    await api.postArticle(articleData);
    res.redirect(`/my`);
  } catch (err) {
    const redirectUrl = getStringQuery(`/articles/add`, articleData).toString(); // ?? не нашёл, как передать файл через query ??
    res.redirect(redirectUrl);
  }
});


articlesRouter.get(ArticleRoute.CATEGORY, render(Template.ARTICLES_BY_CATEGORY));
articlesRouter.get(ArticleRoute.ADD, async (req, res) => {

  const query = getQueriesFromRedirect(req.query);
  const checkedCategories = query.category || [];

  const allCategories = await api.getCategories();
  const categories = allCategories.map((item) => ({name: item.name, checked: checkedCategories.some((cat) => cat === item.name)}));

  res.render(Template.POST, {article: query, categories});
});

articlesRouter.get(ArticleRoute.EDIT, async (req, res) => {
  const {id} = req.params;
  const article = await api.getOneArticles(id);
  const allCategories = await api.getCategories();
  const categories = allCategories.map((item) => ({...item, checked: article.categories.some((cat) => cat.name === item.name)}));

  res.render(Template.POST, {article, categories});
});


articlesRouter.get(ArticleRoute.ID, async (req, res) => {
  const {id} = req.params;
  const rawArticle = await api.getOneArticles(id);
  const allCategories = await api.getCategories(true);

  const rawComments = await api.getCommentsByArticleId(id);

  const needCategories = rawArticle.categories.map((item) => item.name);

  const categories = allCategories.filter((item) => needCategories.includes(item.name));
  const article = {...rawArticle, date: getDate(rawArticle.createdAt, ARTICLE_DATE_FORMAT)};
  const comments = rawComments.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));

  res.render(Template.POST_DETAIL, {article, categories, comments});
});

module.exports = articlesRouter;
