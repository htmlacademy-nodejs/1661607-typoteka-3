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

const NAME_PATTERN = /[^0-9$&+,:;=?@#|'<>.^*()%!]+$/;

exports.userSchema = Joi.object({
  email: Joi.string().min(2).email().required().messages({
    [JoiMessageKey.EMAIL]: Message.EMAIL,
  }),
  firstName: Joi.string().min(2).regex(NAME_PATTERN).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.NAME_MIN,
    [JoiMessageKey.REGEXP]: Message.NAME_BAD,
  }),
  lastName: Joi.string().min(2).regex(NAME_PATTERN).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.NAME_MIN,
    [JoiMessageKey.REGEXP]: Message.NAME_BAD,
  }),

  password: Joi.string().min(6).required().messages({
    [JoiMessageKey.STRING_MIN]: Message.PASSWORD
  }),
  passwordRepeat: Joi.string().valid(Joi.ref(`password`)).required().messages({
    [JoiMessageKey.ANY_ONLY]: Message.PASSWORD_REPEAT
  }),
  avatar: Joi.string().regex(/.+\.jpg\b|.+\.png\b/).allow(``).message({
    [JoiMessageKey.REGEXP]: Message.PICTURE
  }),
});
