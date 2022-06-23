'use strict';

const {Router} = require(`express`);
const {HttpCode, ServerRoute} = require(`../../const`);


const categoryRouter = new Router();

module.exports = (apiRouter, service) => {
  apiRouter.use(ServerRoute.CATEGORY, categoryRouter);
  categoryRouter.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    return res.status(HttpCode.OK).json(categories);
  });
};
