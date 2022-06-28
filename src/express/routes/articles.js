'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render, getFormatDate} = require(`../../utils`);
const api = require(`../api`);

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);


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
    createdDate: getFormatDate(Date.now()),
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
  const categories = allCategories.map((item) => ({name: item, checked: checkedCategories.some((cat) => cat === item)}));
  res.render(Template.POST, {article: query, categories});
});

articlesRouter.get(ArticleRoute.EDIT, async (req, res) => {
  const {id} = req.params;
  const article = await api.getOneArticles(id);
  const allCategories = await api.getCategories();
  const categories = allCategories.map((item) => ({name: item, checked: article.category.some((cat) => cat === item)}));

  res.render(Template.POST, {article, categories});
});

articlesRouter.get(ArticleRoute.ID, render(Template.POST_DETAIL));

module.exports = articlesRouter;
