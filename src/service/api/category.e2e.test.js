'use strict';

const express = require(`express`);
const request = require(`supertest`);
const category = require(`./category`);
const CategoryService = require(`../data-service/category`);
const {MOCK_ARTICLES, CATEGORIES, MOCK_USERS} = require(`../../tests/mocks`);
const {HttpCode, ServerRoute} = require(`../../const`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);


const FAKE_CATEGORY = `absent category`;

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());


describe(`CATEGORY API`, () => {
  let response;
  beforeAll(async () => {
    await initDB(mockDB, {articles: MOCK_ARTICLES, categories: CATEGORIES, users: MOCK_USERS});
    category(app, new CategoryService(mockDB));
    response = await request(app).get(ServerRoute.CATEGORY);
  });

  test(`status.code === 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`correct number of categories`, () => expect(response.body.length).toBe(CATEGORIES.length));

  CATEGORIES.forEach((item) => {
    const getNames = (categories) => categories.map((i) => i.name);
    test(`${item} exists in response`, () => expect(getNames(response.body)).toContain(item));
  });

  test(`${FAKE_CATEGORY} does not exist in response`, () => expect(response.body).not.toContain(FAKE_CATEGORY));

});
