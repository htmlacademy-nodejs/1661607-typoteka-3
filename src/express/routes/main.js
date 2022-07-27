'use strict';

const {Router} = require(`express`);
const {Template, MENU} = require(`../../const`);
const {render, asyncHandlerWrapper, createImageUploader, prepareErrors} = require(`../../utils`);
const api = require(`../api`);
const {createMainHandler} = require(`./route-utils`);


const UPLOAD_DIR = `avatars`;


const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  SEARCH: `/search`
};

const upload = createImageUploader(UPLOAD_DIR);


const mainRouter = new Router();

mainRouter.get(MainRoute.LOGIN, asyncHandlerWrapper(render(Template.LOGIN)));

mainRouter.get(MainRoute.MAIN, asyncHandlerWrapper(createMainHandler(api)));

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


// label
// input(type='email' name='email' placeholder='Электронная почта' required)
// .form__field
// label
// input(type='text' name='firstName' placeholder='Имя' required)
// .form__field
// label
// input(type='text' name='lastName' placeholder='Фамилия' required)
// .form__field
// label
// input(type='password' name='password' placeholder='Пароль' required)
// .form__field
// label
// input(type='password' name='repeatPassword' placeholder='Повтор пароля' required)

mainRouter.get(MainRoute.REGISTER, asyncHandlerWrapper(async (req, res) => {
  const data = {email: ``, firstName: ``, lastName: ``};
  res.render(Template.SIGN_UP, data);
}));


mainRouter.get(MainRoute.SEARCH, asyncHandlerWrapper(async (req, res) => {
  const {title} = req.query;

  if (!title) {
    res.render(Template.SEARCH, {articles: [], title: ``});
  } else {
    try {
      const result = await api.search(title);
      res.render(Template.SEARCH, {articles: result, title, menu: `MENU`});
    } catch (err) {
      res.render(Template.SEARCH, {articles: null, title, menu: MENU});
    }
  }
}));

module.exports = mainRouter;
