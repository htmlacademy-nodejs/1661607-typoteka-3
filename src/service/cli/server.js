'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const {Command} = require(`../../const`);
const postsRouter = require(`./routes/posts`);


const Route = {
  POSTS: `/posts`,
};

const DEFAULT_PORT = 3000;


const app = express();

app.use(express.json());

app.use(Route.POSTS, postsRouter);

exports.server = {
  name: Command.SERVER,
  run(arg) {

    const port = +arg || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(red(`Ошибка при создании сервера`, err));
      }
      return console.info(green(`Ожидаю соединений на ${port}`));
    });
  }
};


