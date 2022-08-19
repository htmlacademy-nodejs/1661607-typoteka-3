'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);

const CharacterNumberName = {
  MIN: 5,
  MAX: 30
};


const Message = {
  MIN: `you need at least 5 characters in the category`,
  MAX: `you need a maximum of 30 characters  in the category`
};

exports.categorySchema = Joi.object({
  name: Joi.string().min(CharacterNumberName.MIN).max(CharacterNumberName.MAX).messages({
    [JoiMessageKey.STRING_MIN]: Message.MIN,
    [JoiMessageKey.STRING_MAX]: Message.MAX
  }),
  userId: Joi.number().integer()

});

