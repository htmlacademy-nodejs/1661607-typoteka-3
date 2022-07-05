'use strict';

const express = require(`express`);
const {red, green} = require(`chalk`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);

const {Command, HttpCode, ExitCode} = require(`../../const`);
const {runRouter} = require(`../api`);


const DEFAULT_PORT = 3000;


exports.server = {
  name: Command.SERVER,
  async run(arg) {

    const logger = getLogger({name: `api`});

    try {
      logger.info(`trying to connect to DB`);
      await sequelize.authenticate();
      logger.info(`success connection to DB`);
    } catch (err) {
      logger.error(`cannot connect to DB, error: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }

    const app = express();

    app.use(express.json());
    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => logger.info(`Response status code ${res.statusCode}`));
      next();
    });


    app.use(`/api`, await runRouter());

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


    const port = +arg || DEFAULT_PORT;
    app.listen(port)
      .on(`listening`, () => {
        logger.info(green(`data server: Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => logger.error(red(`data server: Ошибка при создании сервера, ${message}`)));
  }
};


