'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const {Command} = require(`../../const`);
const {apiRouter, runRouter} = require(`../api`);


const DEFAULT_PORT = 3000;


const app = express();

app.use(express.json());

app.use(`/api`, apiRouter);

exports.server = {
  name: Command.SERVER,
  run(arg) {

    const port = +arg || DEFAULT_PORT;
    app.listen(port)
      .on(`listening`, () => {
        runRouter(); // или где ее лучше запускать?
        console.info(green(`data server: Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => console.error(red(`data server: Ошибка при создании сервера, ${message}`)));
  }
};


