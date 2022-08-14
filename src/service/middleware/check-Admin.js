'use strict';

const {ADMIN_ID, HttpCode} = require(`../../const`);

const checkAdmin = (req, res, next) => {
  // console.log(req.body);
  if (req.body.userId === ADMIN_ID) {
    return next();
  }

  return res.status(HttpCode.FORBIDDEN).send(`You are not Admin!`);

};

module.exports = checkAdmin;
