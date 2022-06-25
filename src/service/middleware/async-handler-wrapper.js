'use strict';

const {HttpCode} = require(`../../const`);

const asyncHandlerWrapper = (fn) => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(() => res.status(HttpCode.INTERNAL_SERVER_ERROR).json({message: `Server Error`}))
    .finally(() => next(`If you see it in the browser, you forgot to call next and res.*`)); // не смог придумать ничего умнее(

module.exports = asyncHandlerWrapper;
