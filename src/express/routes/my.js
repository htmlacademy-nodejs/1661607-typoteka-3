'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render} = require(`../../utils`);
const api = require(`../api`);


const MyRoute = {
  MAIN: `/`,
  COMMENTS: `/comments`,
  CATEGORIES: `/categories`
};

const categoryContent = {
  categories: [`Жизнь и путешествия`, `Путешествия`, `Дизайн и программирование`, `Другое`, `Личное`]
};

const createCommentWithTitle = (comments, articleTitle) => comments.map((item) => ({...item, articleTitle}));

const myRouter = new Router();

myRouter.get(MyRoute.MAIN, async (req, res) => {
  const articles = await api.getAllArticles();
  res.render(Template.MY, {articles});
});

myRouter.get(MyRoute.COMMENTS, async (req, res) => {
  const articles = await api.getAllArticles();
  const commentsWitArticleTitle = articles.reduce((acc, item) => ([...acc, ...createCommentWithTitle(item.comments, item.title)]), []);
  res.render(Template.COMMENTS, {comments: commentsWitArticleTitle});
});

myRouter.get(MyRoute.CATEGORIES, render(Template.ALL_CATEGORIES, {categories: categoryContent}));

module.exports = myRouter;
