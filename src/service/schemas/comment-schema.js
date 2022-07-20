'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);


const Message = {
  MIN: `you need at least three characters`,
  MAX: `you need a maximum of 1000 characters`
};


exports.commentSchema = Joi.object({
  text: Joi.string().min(3).max(1000).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.MIN,
    [JoiMessageKey.STRING_MAX]: Message.MAX
  })
});

