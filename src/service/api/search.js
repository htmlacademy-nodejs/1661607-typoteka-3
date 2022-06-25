'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);
const asyncHandlerWrapper = require(`../middleware/async-handler-wrapper`);
const logEachRequest = require(`../middleware/log-each-request`);


module.exports = (apiRouter, service) => {

  const searchRouter = new Router();

  apiRouter.use(`/search`, searchRouter);

  searchRouter.get(`/`, logEachRequest, asyncHandlerWrapper(async (req, res) => {
    const {title} = req.query;

    if (!title) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }

    const articles = await service.findAll(title);
    return res.status(articles.length ? HttpCode.OK : HttpCode.NOT_FOUND).json(articles);
  }));
};
