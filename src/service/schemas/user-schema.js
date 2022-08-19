'use strict';

const Joi = require(`joi`);
const {JoiMessageKey} = require(`../../const`);

const Message = {
  NAME_MIN: `you need at least 2 characters in your name and last name`,
  NAME_BAD: `the name can only contain letters and a space`,
  EMAIL: `email is incorrect`,
  PASSWORD: `you need at least 6 characters in the password`,
  PASSWORD_REPEAT: `the passwords do not match`,
  PICTURE: `the image type is not supported`
};


const CharacterNumber = {
  EMAIL: 2,
  NAME: 2,
  PASSWORD: 6
};


const Pattern = {
  NAME: /[^0-9$&+,:;=?@#|'<>.^*()%!]+$/,
  AVATAR: /.+\.jpg\b|.+\.png\b/
};

exports.userSchema = Joi.object({
  email: Joi.string().min(CharacterNumber.EMAIL).email().required().messages({
    [JoiMessageKey.EMAIL]: Message.EMAIL,
  }),
  firstName: Joi.string().min(CharacterNumber.NAME).regex(Pattern.NAME).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.NAME_MIN,
    [JoiMessageKey.REGEXP]: Message.NAME_BAD,
  }),
  lastName: Joi.string().min(CharacterNumber.NAME).regex(Pattern.NAME).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.NAME_MIN,
    [JoiMessageKey.REGEXP]: Message.NAME_BAD,
  }),

  password: Joi.string().min(CharacterNumber.PASSWORD).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.PASSWORD
  }),
  passwordRepeat: Joi.string().valid(Joi.ref(`password`)).required().messages({
    [JoiMessageKey.ANY_ONLY]: Message.PASSWORD_REPEAT
  }),
  avatar: Joi.string().regex(Pattern.AVATAR).allow(``).message({
    [JoiMessageKey.REGEXP]: Message.PICTURE
  }),
});
