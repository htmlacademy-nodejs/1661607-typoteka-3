'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);

const Message = {
  TITLE_MIN: `you need at least 30 characters in the title`,
  TITLE_MAX: `you need a maximum of 250 characters in the title`,
  ANNOUNCE_MIN: `you need at least 30 characters in the announce`,
  ANNOUNCE_MAX: `you need a maximum of 250 characters in the announce`,
  FULL_TEXT_MAX: `you need a maximum of 1000 characters in the article text`,
  CATEGORIES: `you need at least 1 category`,
  PICTURE: `the image type is not supported`,
  USER_ID: `not or bad userId`
};


exports.articleSchema = Joi.object({
  title: Joi.string().min(30).max(250).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.TITLE_MIN,
    [JoiMessageKey.STRING_MAX]: Message.TITLE_MAX
  }),
  announce: Joi.string().min(30).max(250).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.ANNOUNCE_MIN,
    [JoiMessageKey.STRING_MAX]: Message.ANNOUNCE_MAX
  }),
  fullText: Joi.string().max(1000).allow(``).optional().messages({
    [JoiMessageKey.STRING_MAX]: Message.FULL_TEXT_MAX
  }),
  picture: Joi.string().regex(/.+\.jpg\b|.+\.png\b/).allow(``).message({
    [JoiMessageKey.REGEXP]: Message.PICTURE
  }),
  categories: Joi.array().required().items(
      Joi.number().integer().positive()
      .messages({
        [JoiMessageKey.NUMBER_BASE]: Message.CATEGORIES
      })
  ),
  comments: Joi.array().required(),
  userId: Joi.number().integer(),
});
