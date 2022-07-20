'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);

const Message = {
  TITLE_MIN: `you need at least 30 characters`,
  TITLE_MAX: `you need a maximum of 250 characters`,
  FULL_TEXT_MAX: `you need a maximum of 1000 characters`,
  CATEGORIES: `you need at least 1 category`,
  PICTURE: `the image type is not supported`
};


exports.articleSchema = Joi.object({
  title: Joi.string().min(30).max(250).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.TITLE_MIN,
    [JoiMessageKey.STRING_MAX]: Message.TITLE_MAX
  }),
  announce: Joi.string().min(30).max(250).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.TITLE_MIN,
    [JoiMessageKey.STRING_MAX]: Message.TITLE_MAX
  }),
  fullText: Joi.string().max(1000).messages({
    [JoiMessageKey.STRING_MAX]: Message.FULL_TEXT_MAX
  }),
  picture: Joi.string().pattern(new RegExp(`\.png$||\.jpg$`)).messages({
    [JoiMessageKey.STRING_EMPTY]: Message.PICTURE
  }),
  categories: Joi.array().items(
      Joi.number().integer().positive().messages({
        [JoiMessageKey.NUMBER_BASE]: Message.CATEGORIES
      })
  )
});
