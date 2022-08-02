'use strict';

const {Router} = require(`express`);
const {HttpCode, ServerRoute, NOT_DROP_CATEGORY_MESSAGE} = require(`../../const`);
const {asyncHandlerWrapper} = require(`../../utils`);
const validateCategory = require(`../middleware/validate-category`);
const validateId = require(`../middleware/validateId`);


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

  categoryRouter.put(`/:id`, [validateCategory, validateId(`id`)], asyncHandlerWrapper(async (req, res) => {

    const {id} = req.params;

    const categories = await service.update(id, req.body);

    return res.status(HttpCode.OK).json(categories);
  }));

  categoryRouter.delete(`/:id`, [validateCategory, validateId(`id`)], asyncHandlerWrapper(async (req, res) => {

    const {id} = req.params;

    const dropCategory = await service.drop(id);

    if (dropCategory === NOT_DROP_CATEGORY_MESSAGE) {
      return res.status(HttpCode.BAD_REQUEST).send(NOT_DROP_CATEGORY_MESSAGE);
    }

    if (!dropCategory) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found category with id = ${id}`);
    }

    return res.status(HttpCode.OK).json(dropCategory);
  }));


};


