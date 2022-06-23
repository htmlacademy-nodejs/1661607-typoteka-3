

'use strict';

const COMMENT_FIELDS = [`text`];

const {HttpCode} = require(`../../const`);
const {checkFields} = require(`../../utils`);

module.exports = (req, res, next) => {

  const commentKeys = Object.keys(req.body);

  if (!checkFields(COMMENT_FIELDS, commentKeys)) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
