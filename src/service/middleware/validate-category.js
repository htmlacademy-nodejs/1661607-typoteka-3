'use strict';

const {validateData} = require(`../../utils`);
const {categorySchema} = require(`../schemas/category-schema`);

module.exports = (req, res, next) => validateData(categorySchema, req.body, res, next);

