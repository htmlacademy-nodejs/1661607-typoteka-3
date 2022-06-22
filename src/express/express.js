'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const path = require(`path`);

const articlesRouter = require(`./routes/articles`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);


const PORT = 8080;

const RootRoute = {
  MAIN: `/`,
  ARTICLES: `/articles`,
  MY: `/my`,
};


const app = express();

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, `public`)));

app.use(RootRoute.ARTICLES, articlesRouter);
app.use(RootRoute.MAIN, mainRouter);
app.use(RootRoute.MY, myRouter);

app.listen(PORT)
  .on(`listening`, () => console.info(green(`front server: Ожидаю соединений на ${PORT}`)))
  .on(`error`, ({message}) => console.error(red(`front server: Ошибка при создании сервера, ${message}`)));
