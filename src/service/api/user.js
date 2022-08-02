'use strict';


const {Router} = require(`express`);
const passwordUtils = require(`../lib/password`);
const validateUser = require(`../middleware/validate-user`);
const {HttpCode, ServerRoute} = require(`../../const`);
const {asyncHandlerWrapper} = require(`../../utils`);


const UserRoute = {
  MAIN: `/`,
  AUTH: `/auth`,
};

const ErrorMessage = {
  EMAIL: `This email is not exist`,
  PASSWORD: `This password is not correct`
};

module.exports = (app, service) => {

  const router = new Router();
  app.use(ServerRoute.USER, router);


  router.post(UserRoute.MAIN, validateUser(service), asyncHandlerWrapper(async (req, res) => {
    const data = req.body;

    data.passwordHash = await passwordUtils.hash(data.password);

    const user = await service.create(data);

    delete user.passwordHash;

    res.status(HttpCode.CREATED).json(user);
  }));

  router.post(UserRoute.AUTH, asyncHandlerWrapper(async (req, res) => {
    const {email, password} = req.body;

    const user = await service.getUserByEmail(email);

    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).send(ErrorMessage.EMAIL);
    }

    const isPasswordCorrect = await passwordUtils.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {

      return res.status(HttpCode.UNAUTHORIZED).send(ErrorMessage.PASSWORD);
    }

    delete user.passwordHash;
    return res.status(HttpCode.OK).json(user);

  }));


};
