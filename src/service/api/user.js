'use strict';


const {Router} = require(`express`);
const passwordUtils = require(`../lib/password`);
const validateUser = require(`../middleware/validate-user`);
const {HttpCode, ServerRoute} = require(`../../const`);


const UserRoute = {
  MAIN: `/`,
  AUTH: `/auth`,
};

module.exports = (app, service) => {

  const router = new Router();
  app.use(ServerRoute.USER, router);

  router.post(UserRoute.MAIN, validateUser(service), async (req, res) => {
    const data = req.body;

    data.passwordHash = await passwordUtils.hash(data.password);

    const user = await service.create(data);

    delete user.passwordHash;

    res.status(HttpCode.CREATED).json(user);
  });
};
