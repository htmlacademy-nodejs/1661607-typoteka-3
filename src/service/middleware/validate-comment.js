'use strict';


const {HttpCode} = require(`../../const`);
const {commentSchema} = require(`../schemas/comment-schema`);

module.exports = (req, res, next) => {

  const comment = req.body;
  const {error} = commentSchema.validate(comment, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST).send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
