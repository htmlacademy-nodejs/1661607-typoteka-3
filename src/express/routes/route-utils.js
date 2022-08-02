'use strict';

const {Template, LIMIT_ARTICLES, LIMIT_COMMENTS} = require(`../../const`);


const createMainHandler = (api, isMain) => async (req, res) => {

  const {user} = req.session;

  const {id} = req.params;

  const page = +req.query.page || 1;

  const offset = (page - 1) * LIMIT_ARTICLES;

  const categories = await api.getCategories(true);
  const {articles, count} = await api.getAllArticles({limit: LIMIT_ARTICLES, offset, categoryId: id});
  const topArticles = isMain ? await api.getAllArticles({top: 4}) : null;

  const comments = isMain ? await api.getAllComments(LIMIT_COMMENTS) : null;
  const totalPage = Math.ceil(+count / LIMIT_ARTICLES);
  const pages = new Array(totalPage).fill(null).map((_, i) => i + 1);
  res.render(Template.MAIN, {title: `Типотека`, articles, count, pages, page, totalPage, categories, id, user, comments, topArticles, isMain});
};


module.exports = {createMainHandler};
