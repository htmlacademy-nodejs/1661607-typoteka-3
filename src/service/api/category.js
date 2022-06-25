'use strict';

const {Router} = require(`express`);
const {HttpCode, ServerRoute} = require(`../../const`);
const asyncHandlerWrapper = require(`../middleware/async-handler-wrapper`);
const logEachRequest = require(`../middleware/log-each-request`);


module.exports = (apiRouter, service) => {
  const categoryRouter = new Router();
  apiRouter.use(ServerRoute.CATEGORY, categoryRouter);
  categoryRouter.get(`/`, logEachRequest, asyncHandlerWrapper(async (req, res) => {
    const categories = await service.findAll();
    return res.status(HttpCode.OK).json(categories);
  }));
};
