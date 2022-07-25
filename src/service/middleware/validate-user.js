'use strict';

const {validateData} = require(`../../utils`);
const {userSchema} = require(`../schemas/user-schema`);


module.exports = (req, res, next) => validateData(userSchema, req.body, res, next);

