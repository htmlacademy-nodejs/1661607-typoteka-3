'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);


module.exports = (apiRouter, service) => {

  const searchRouter = new Router();

  apiRouter.use(`/search`, searchRouter);

  searchRouter.get(`/`, async (req, res) => {
    const {title} = req.query;

    if (!title) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }

    const articles = await service.findAll(title);
    return res.status(articles.length ? HttpCode.OK : HttpCode.NOT_FOUND).json(articles);
  });
};
