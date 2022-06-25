'use strict';

const {HttpCode} = require(`../../const`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `asyncHandlerWrapper`});

const getError = (res, isError, message) => {
  if (isError) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(message);
    logger.error(message);
  }
};

const asyncHandlerWrapper = (fn) => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch((err) => getError(res, true, `Server Error, ${err}`))
    .finally(() => getError(res, !res.finished, `forgot to call next and res.*`)); // вроде работает, наверно можно как-то короче и правильние, но как не придумал

module.exports = asyncHandlerWrapper;
