'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);


const Message = {
  MIN: `you need at least 20 characters`,
  MAX: `you need a maximum of 1000 characters`,
  USER_ID: `user id is not correct`
};


exports.commentSchema = Joi.object({
  text: Joi.string().min(20).max(1000).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.MIN,
    [JoiMessageKey.STRING_MAX]: Message.MAX
  }),
  userId: Joi.number().positive().integer().required().messages({
    [JoiMessageKey.NUMBER_BASE]: Message.USER_ID
  })
});

