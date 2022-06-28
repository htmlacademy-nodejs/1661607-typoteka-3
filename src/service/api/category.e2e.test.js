'use strict';

const express = require(`express`);
const request = require(`supertest`);
const category = require(`./category`);
const CategoryService = require(`../data-service/category`);
const {MOCK_ARTICLES, CATEGORIES} = require(`../../tests/mocks`);
const {HttpCode, ServerRoute} = require(`../../const`);


const FAKE_CATEGORY = `absent category`;

const app = express();
app.use(express.json());
category(app, new CategoryService(MOCK_ARTICLES));

describe(`CATEGORY API`, () => {
  let response;
  beforeAll(async () => {
    response = await request(app).get(ServerRoute.CATEGORY);
  });

  test(`status.code === 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`correct number of categories`, () => expect(response.body.length).toBe(CATEGORIES.length));

  CATEGORIES.forEach((item) => {
    test(`${item} exists in response`, () => expect(response.body).toContain(item));
  });

  test(`${FAKE_CATEGORY} does not exist in response`, () => expect(response.body).not.toContain(FAKE_CATEGORY));

});

