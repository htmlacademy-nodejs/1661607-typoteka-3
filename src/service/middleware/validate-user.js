'use strict';

const {HttpCode} = require(`../../const`);
const {userSchema} = require(`../schemas/user-schema`);


module.exports = (service) => async (req, res, next) => {
  const data = req.body;
  const {error} = userSchema.validate(data, {abortEarly: false});
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).send(error.details.map((err) => err.message).join(`\n`));
  }

  const user = await service.getUserByEmail(data.email);
  if (user) {
    return res.status(HttpCode.BAD_REQUEST).send(`a user with the same email already exists`);
  }

  return next();
};


