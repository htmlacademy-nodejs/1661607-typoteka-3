'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);


const searchRouter = new Router();

module.exports = (apiRouter, service) => {

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
