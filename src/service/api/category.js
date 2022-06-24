'use strict';

const {Router} = require(`express`);
const {HttpCode, ServerRoute} = require(`../../const`);


module.exports = (apiRouter, service) => {
  const categoryRouter = new Router();
  apiRouter.use(ServerRoute.CATEGORY, categoryRouter);
  categoryRouter.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    return res.status(HttpCode.OK).json(categories);
  });
};
