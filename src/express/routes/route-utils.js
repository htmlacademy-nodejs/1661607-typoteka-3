'use strict';

const {Template, LIMIT_ARTICLES, LIMIT_COMMENTS, ARTICLE_DATE_FORMAT} = require(`../../const`);
const {getDate} = require(`../../utils`);


const cut100 = (text) => text.length < 101 ? text : `${text.substring(0, 100)}...`;

const cutInDataField = (data, field) => data ? data.map((item) => ({...item, [field]: cut100(item[field])})) : null;


const createMainHandler = (api, isMain) => async (req, res) => {

  const {user} = req.session;

  const {id} = req.params;

  const page = +req.query.page || 1;

  const offset = (page - 1) * LIMIT_ARTICLES;

  const categories = await api.getCategories(true);
  const {articles: rawArticles, count} = await api.getAllArticles({limit: LIMIT_ARTICLES, offset, categoryId: id});
  const articles = rawArticles.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));

  const topArticlesServer = isMain ? await api.getAllArticles({top: 4}) : null;
  const topArticles = cutInDataField(topArticlesServer, `title`);

  const commentsServer = isMain ? await api.getAllComments(LIMIT_COMMENTS) : null;
  const comments = cutInDataField(commentsServer, `text`);

  const totalPage = Math.ceil(+count / LIMIT_ARTICLES);
  const pages = new Array(totalPage).fill(null).map((_, i) => i + 1);
  res.render(Template.MAIN, {title: `Типотека`, articles, count, pages, page, totalPage, categories, id, user, comments, topArticles, isMain, csrfToken: req.csrfToken()});
};


module.exports = {createMainHandler};
