'use strict';

const {Template, LIMIT_ARTICLES, LIMIT_COMMENTS, ARTICLE_DATE_FORMAT} = require(`../../const`);
const {getDate} = require(`../../utils`);


const createMainHandler = (api, isMain) => async (req, res) => {

  const {user} = req.session;

  const {id} = req.params;

  const page = +req.query.page || 1;

  const offset = (page - 1) * LIMIT_ARTICLES;

  const categories = await api.getCategories(true);
  const {articles: rawArticles, count} = await api.getAllArticles({limit: LIMIT_ARTICLES, offset, categoryId: id});
  const articles = rawArticles.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));
  const topArticles = isMain ? await api.getAllArticles({top: 4}) : null;

  const comments = isMain ? await api.getAllComments(LIMIT_COMMENTS) : null;
  const totalPage = Math.ceil(+count / LIMIT_ARTICLES);
  const pages = new Array(totalPage).fill(null).map((_, i) => i + 1);
  res.render(Template.MAIN, {title: `Типотека`, articles, count, pages, page, totalPage, categories, id, user, comments, topArticles, isMain, csrfToken: req.csrfToken()});
};


module.exports = {createMainHandler};
