'use strict';

const {validateData} = require(`../../utils`);
const {articleSchema} = require(`../schemas/article-schema`);


module.exports = (req, res, next) => validateData(articleSchema, req.body, res, next);

