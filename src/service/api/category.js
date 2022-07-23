'use strict';

const {Router} = require(`express`);
const {HttpCode, ServerRoute} = require(`../../const`);
const {asyncHandlerWrapper} = require(`../../utils`);
// const asyncHandlerWrapper = require(`../middleware/async-handler-wrapper`);
const validateCategory = require(`../middleware/validate-category`);


module.exports = (apiRouter, service) => {
  const categoryRouter = new Router();
  apiRouter.use(ServerRoute.CATEGORY, categoryRouter);

  categoryRouter.get(`/`, asyncHandlerWrapper(async (req, res) => {
    const {count} = req.query;

    const categories = count ? await service.findAllWithCount() : await service.findAll();
    return res.status(HttpCode.OK).json(categories);
  }));


  categoryRouter.post(`/`, validateCategory, asyncHandlerWrapper(async (req, res) => {

    const categories = await service.create(req.body);

    return res.status(HttpCode.OK).json(categories);
  }));


};


