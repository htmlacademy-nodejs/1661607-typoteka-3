'use strict';

const {HttpCode} = require(`../../const`);
const {articleSchema} = require(`../schemas/article-schema`);

module.exports = (req, res, next) => {

  const article = req.body;

  const {error} = articleSchema.validate(article, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST).send(error.details.map((err) => err.message).join(`\n`));
  }
  return next();
};
