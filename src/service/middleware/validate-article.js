'use strict';


const ARTICLE_FIELDS = [`title`, `announce`, `fullText`, `category`, `comments`];


const {HttpCode} = require(`../../const`);
const {checkFields} = require(`../../utils`);

module.exports = (req, res, next) => {

  const articleKeys = Object.keys(req.body);

  if (!checkFields(ARTICLE_FIELDS, articleKeys)) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }
  return next();
};
