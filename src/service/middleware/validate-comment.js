'use strict';


const {validateData} = require(`../../utils`);
const {commentSchema} = require(`../schemas/comment-schema`);


module.exports = (req, res, next) => validateData(commentSchema, req.body, res, next);
