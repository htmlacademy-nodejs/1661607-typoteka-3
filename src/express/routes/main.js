'use strict';

const {Router} = require(`express`);
const {Template, ARTICLE_DATE_FORMAT} = require(`../../const`);
const {asyncHandlerWrapper, createImageUploader, prepareErrors, getDate} = require(`../../utils`);
const api = require(`../api`);
const {createMainHandler} = require(`./route-utils`);

const csrf = require(`csurf`);
const csrfProtection = csrf();

const UPLOAD_DIR = `avatars`;


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  SEARCH: `/search`
};

const upload = createImageUploader(UPLOAD_DIR);


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, asyncHandlerWrapper(async (req, res) => {
  const {user} = req.session;
  res.render(Template.LOGIN, {user});
}));


mainRouter.post(MainRoute.LOGIN, async (req, res) => {

  const body = req.body;

  try {
    const user = await api.auth(body);
    req.session.user = user;
    req.session.save(() => res.redirect(`/`));

  } catch (err) {
    const errors = prepareErrors(err);
    res.render(Template.LOGIN, {errors});
  }
});

mainRouter.get(MainRoute.LOGOUT, (req, res) => {
  req.session.destroy(() => res.redirect(MainRoute.MAIN));
});

mainRouter.get(MainRoute.MAIN, csrfProtection, asyncHandlerWrapper(createMainHandler(api, true)));

mainRouter.post(MainRoute.REGISTER, upload.single(`avatar`), async (req, res) => {

  const {body, file} = req;

  const data = {...body, avatar: file ? file.filename : ``};

  try {
    await api.postUser(data);
    res.redirect(MainRoute.LOGIN);
  } catch (err) {
    const errors = prepareErrors(err);
    res.render(Template.SIGN_UP, {...data, errors, errorTitle: `При регистрации произошли ошибки:`});
  }
});


mainRouter.get(MainRoute.REGISTER, asyncHandlerWrapper(async (req, res) => {
  const {user} = req.session;
  const data = {email: ``, firstName: ``, lastName: ``, user};
  res.render(Template.SIGN_UP, data);
}));


mainRouter.get(MainRoute.SEARCH, csrfProtection, asyncHandlerWrapper(async (req, res) => {
  const {user} = req.session;
  const {title} = req.query;

  if (!title) {
    res.render(Template.SEARCH, {articles: [], title: ``, user});
  } else {
    try {
      const results = await api.search(title);
      const articles = results.map((item) => ({...item, date: getDate(item.createdAt, ARTICLE_DATE_FORMAT)}));
      res.render(Template.SEARCH, {articles, title, user, csrfToken: req.csrfToken()});
    } catch (err) {
      res.render(Template.SEARCH, {articles: null, title, user, csrfToken: req.csrfToken()});
    }
  }
}));

module.exports = mainRouter;
