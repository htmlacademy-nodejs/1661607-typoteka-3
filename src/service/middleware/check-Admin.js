'use strict';

const {ADMIN_ID, HttpCode} = require(`../../const`);

const checkAdmin = (req, res, next) => {
  if (req.body.userId === ADMIN_ID) {
    return next();
  }

  return res.status(HttpCode.FORBIDDEN).send(`You are not Admin!`);

};

module.exports = checkAdmin;
