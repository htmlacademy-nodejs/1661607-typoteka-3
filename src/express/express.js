'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const path = require(`path`);

const articlesRouter = require(`./routes/articles`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const {HttpCode, Template} = require(`../const`);
const {getLogger} = require(`../service/lib/logger`);


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

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, StaticDirName.PUBLIC)));
app.use(express.static(path.resolve(__dirname, StaticDirName.UPLOAD)));


app.use(RootRoute.ARTICLES, articlesRouter);
app.use(RootRoute.MAIN, mainRouter);
app.use(RootRoute.MY, myRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).render(Template.ERR_404);
  logger.error(`Route not found: ${req.url}`);
});

app.listen(PORT)
  .on(`listening`, () => console.info(green(`front server: Ожидаю соединений на ${PORT}`)))
  .on(`error`, ({message}) => console.error(red(`front server: Ошибка при создании сервера, ${message}`)));
