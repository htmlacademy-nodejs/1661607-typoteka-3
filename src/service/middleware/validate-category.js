'use strict';

const {validateData} = require(`../../utils`);
const {categorySchema} = require(`../schemas/category-schema`);

module.exports = (req, res, next) => validateData(categorySchema, req.body, res, next);

// module.exports = (req, res, next) => {

//   const comment = req.body;
//   const {error} = categorySchema.validate(comment, {abortEarly: false});

//   if (error) {
//     return res.status(HttpCode.BAD_REQUEST).send(error.details.map((err) => err.message).join(`\n`));
//   }

//   return next();
// };
