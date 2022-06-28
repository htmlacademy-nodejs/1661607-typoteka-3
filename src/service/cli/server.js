'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const {getLogger} = require(`../lib/logger`);
const {Command, HttpCode} = require(`../../const`);
const {apiRouter, runRouter} = require(`../api`);


const DEFAULT_PORT = 3000;


const logger = getLogger({name: `api`});
const app = express();

app.use(express.json());

app.use(`/api`, apiRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => logger.info(`Response status code ${res.statusCode}`));
  next();
});


exports.server = {
  name: Command.SERVER,
  run(arg) {

    const port = +arg || DEFAULT_PORT;
    app.listen(port)
      .on(`listening`, () => {
        runRouter(); // или где ее лучше запускать?
        logger.info(green(`data server: Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => logger.error(red(`data server: Ошибка при создании сервера, ${message}`)));
  }
};


