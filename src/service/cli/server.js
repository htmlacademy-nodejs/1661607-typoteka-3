'use strict';

const express = require(`express`);
const session = require(`express-session`);
const {red, green} = require(`chalk`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const {Command, HttpCode} = require(`../../const`);
const {runRouter} = require(`../api`);
const {connectToDB} = require(`../../utils`);

const SequelizeStore = require(`connect-session-sequelize`)(session.Store);


const DEFAULT_PORT = 3000;


exports.server = {
  name: Command.SERVER,
  async run(arg) {


    const logger = getLogger({name: `api`});

    await connectToDB(sequelize, logger);

    const app = express();

    const mySessionStore = new SequelizeStore({
      db: sequelize,
      expiration: 180000,
      checkExpirationInterval: 60000,
      tableName: `sessions`
    });

    app.use(session({
      secret: `super_secret`,
      resave: false,
      saveUninitialized: false,
      // name: `session_id`,
      // cookie: {maxAge: 2 * 24 * 60 * 1000},
      store: mySessionStore,
      proxy: true,
    }));

    app.use(express.json());
    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      logger.info(`Request on route ${req.url}`);

      res.on(`finish`, () => logger.info(`Response status code ${res.statusCode}`));
      next();
    });


    app.use(`/api`, await runRouter());
    app.get(`/`, (req, res) => {
      let {counter = 0} = req.session;
      counter++;

      const welcomeText = `Это ваш первый визит на наш сайт.`;
      const text = `Вы посетили наш сайт уже ${counter} раз`;

      const message = counter === 1 ? welcomeText : text;
      req.session.counter = counter;

      res.send(message);
    });

    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occurred on processing request: ${err.message}`);
    });


    const port = +arg || DEFAULT_PORT;
    app.listen(port)
      .on(`listening`, () => {
        logger.info(green(`data server: Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => logger.error(red(`data server: Ошибка при создании сервера, ${message}`)));

    (async () => {
      await sequelize.sync({force: false});
    })();
  }
};


