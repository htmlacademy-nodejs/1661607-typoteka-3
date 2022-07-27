"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const {MOCK_ARTICLES, CATEGORIES, MOCK_USERS} = require(`../../tests/mocks`);
const UserService = require(`../data-service/user`);
const initDB = require(`../lib/init-db`);
const user = require(`./user`);
const {ServerRoute, HttpCode} = require(`../../const`);


const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {articles: MOCK_ARTICLES, categories: CATEGORIES, users: MOCK_USERS});
  const app = express();
  app.use(express.json());
  user(app, new UserService(mockDB));
  return app;
};


const goodUser = {
  email: `good@mail.com`,
  firstName: `good name`,
  lastName: `good name`,
  password: `good password`,
  passwordRepeat: `good password`,
  avatar: `good-avatar.png`
};

describe(`API creates user if data is valid`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .post(ServerRoute.USER).send(goodUser);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
});

describe(`API creates user if data is not valid`, () => {

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });


  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(goodUser)) {
      const badUser = {...goodUser};
      delete badUser[key];
      if (key === `avatar`) {
        await request(app)
        .post(ServerRoute.USER)
        .send(badUser)
        .expect(HttpCode.CREATED);
      } else {
        await request(app)
        .post(ServerRoute.USER)
        .send(badUser)
        .expect(HttpCode.BAD_REQUEST);
      }
    }
  });


  test(`When field type is wrong response code is 400`, async () => {
    const badUsers = [
      {...goodUser, firstName: true},
      {...goodUser, email: 1},
      {...goodUser, avatar: {}},
    ];
    for (const badUserData of badUsers) {
      await request(app)
        .post(ServerRoute.USER)
        .send(badUserData)
        .expect(HttpCode.BAD_REQUEST);
    }
  });


  test(`When field value is wrong response code is 400`, async () => {
    const badUsers = [
      {...goodUser, password: `short`, passwordRepeated: `short`},
      {...goodUser, email: `a bad mail`},
      {...goodUser, firstName: `193--0kjf`},
      {...goodUser, avatar: `193--0kjf.exe`},
    ];
    for (const badUserData of badUsers) {
      await request(app)
        .post(ServerRoute.USER)
        .send(badUserData)
        .expect(HttpCode.BAD_REQUEST);
    }
  });


  test(`When password and passwordRepeated are not equal, code is 400`, async () => {
    const badUser = {...goodUser, passwordRepeat: `not repeat`};
    await request(app)
      .post(ServerRoute.USER)
      .send(badUser)
      .expect(HttpCode.BAD_REQUEST);
  });


  test(`When email is already in use status code is 400`, async () => {
    const badUser = {...goodUser, email: MOCK_USERS[0].email};
    await request(app)
      .post(ServerRoute.USER)
      .send(badUser)
      .expect(HttpCode.BAD_REQUEST);
  });
});

