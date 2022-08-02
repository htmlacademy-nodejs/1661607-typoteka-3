'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const path = require(`path`);
const session = require(`express-session`);
const articlesRouter = require(`./routes/articles`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const {HttpCode, Template} = require(`../const`);
const {getLogger} = require(`../service/lib/logger`);
const sequelize = require(`../service/lib/sequelize`);

const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const PORT = 8080;

const RootRoute = {
  MAIN: `/`,
  ARTICLES: `/articles`,
  MY: `/my`,
};

const StaticDirName = {
  PUBLIC: `public`,
  UPLOAD: `upload`
};


const app = express();

const logger = getLogger({name: `client-api`});
const mySessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 60 * 60 * 1000,
  checkExpirationInterval: 10 * 60 * 1000,
  tableName: `sessions`
});

sequelize.sync({force: false});
app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: `super_secret`,
  resave: false,
  saveUninitialized: false,
  store: mySessionStore,
  proxy: true,
}));


app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, StaticDirName.PUBLIC)));
app.use(express.static(path.resolve(__dirname, StaticDirName.UPLOAD)));


app.use(RootRoute.ARTICLES, articlesRouter);
app.use(RootRoute.MAIN, mainRouter);
app.use(RootRoute.MY, myRouter);

app.use((req, res) => {
  const {user} = req.session;
  res.status(HttpCode.NOT_FOUND).render(Template.ERR_404, {user});
  logger.error(`Route not found: ${req.url}`);
});

app.use((error, req, res, _next) => {
  const {user} = req.session;
  if (error.response && error.response.status === HttpCode.NOT_FOUND) {
    logger.error(`error 404: ${error.response.data}`);
    return res.render(Template.ERR_404, {error: error.response.data, user});
  }
  logger.error(`error 500: ${error}`);
  return res.render(Template.ERR_500, {error, user});
});

app.listen(PORT)
  .on(`listening`, () => console.info(green(`front server: Ожидаю соединений на ${PORT}`)))
  .on(`error`, ({message}) => console.error(red(`front server: Ошибка при создании сервера, ${message}`)));
