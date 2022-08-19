'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);

const CharacterNumber = {
  Title: {
    MIN: 30,
    MAX: 250
  },
  Announce: {
    MIN: 30,
    MAX: 250,
  },
  FullText: {
    MAX: 1000,
  },
};

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

const PICTURE_PATTERN = /.+\.jpg\b|.+\.png\b/;


exports.articleSchema = Joi.object({
  title: Joi.string().min(CharacterNumber.Title.MIN).max(CharacterNumber.Title.MAX).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.TITLE_MIN,
    [JoiMessageKey.STRING_MAX]: Message.TITLE_MAX
  }),
  announce: Joi.string().min(CharacterNumber.Announce.MIN).max(CharacterNumber.Announce.MAX).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.ANNOUNCE_MIN,
    [JoiMessageKey.STRING_MAX]: Message.ANNOUNCE_MAX
  }),
  fullText: Joi.string().max(CharacterNumber.FullText.MAX).allow(``).optional().messages({
    [JoiMessageKey.STRING_MAX]: Message.FULL_TEXT_MAX
  }),
  picture: Joi.string().regex(PICTURE_PATTERN).allow(``).message({
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
