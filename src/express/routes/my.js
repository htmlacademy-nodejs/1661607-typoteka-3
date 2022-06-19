'use strict';

const {Router} = require(`express`);
const {Template} = require(`../../const`);
const {render} = require(`../../utils`);


const MyRoute = {
  MAIN: `/`,
  COMMENTS: `/comments`,
  CATEGORIES: `/categories`
};

const categoryContent = {
  categories: [`Жизнь и путешествия`, `Путешествия`, `Дизайн и программирование`, `Другое`, `Личное`]
};

const myRouter = new Router();

myRouter.get(MyRoute.MAIN, render(Template.MY));
myRouter.get(MyRoute.CATEGORIES, render(Template.ALL_CATEGORIES, categoryContent));
myRouter.get(MyRoute.COMMENTS, render(Template.COMMENTS));

module.exports = myRouter;
