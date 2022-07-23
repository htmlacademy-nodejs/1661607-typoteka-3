'use strict';

const {HttpCode} = require(`../../const`);

const validateId = (id) => (req, res, next) => {
  const paramId = req.params[id];
  if (!+paramId) {
    return res.status(HttpCode.NOT_FOUND).send(`${paramId} is a bad id. Id must be integer`);
  }
  return next();
};

module.exports = validateId;
