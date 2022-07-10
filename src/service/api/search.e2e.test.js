

// 'use strict';

// const express = require(`express`);
// const request = require(`supertest`);
// const search = require(`./search`);
// const SearchService = require(`../data-service/search`);
// const {MOCK_ARTICLES, SearchArticleFragment, CATEGORIES} = require(`../../tests/mocks`);
// const {HttpCode, ServerRoute} = require(`../../const`);
// const initDB = require(`../lib/init-db`);
// const Sequelize = require(`sequelize`);

// const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

// const app = express();
// app.use(express.json());


// beforeAll(async () => {
//   await initDB(mockDB, {categories: CATEGORIES, articles: MOCK_ARTICLES});
//   search(app, new SearchService(mockDB));
// });

// describe(`SEARCH API: positive`, () => {
//   let response;
//   beforeAll(async () => {
//     response = await request(app).get(ServerRoute.SEARCH).query({title: SearchArticleFragment.EXIST});
//   });


//   test(`status.code === 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
//   test(`2 article found`, () => expect(response.body.length).toBe(2));
//   test(`correct first article id`, () => expect(response.body[0].id).toBe(`53LMgEGL`));
//   test(`correct first article title`, () => expect(response.body[0].title).toBe(`Как достигнуть успеха не вставая с кресла`));
// });

// describe(`SEARCH API: negative - not found`, () => {
//   let response;
//   beforeAll(async () => {
//     response = await request(app).get(ServerRoute.SEARCH).query({title: SearchArticleFragment.NO_EXIST});
//   });

//   test(`status.code === 404, when nothing found`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
//   test(`0 article found`, () => expect(response.body.length).toBe(0));
// });

// describe(`SEARCH API: negative - bad request`, () => {
//   let response;
//   beforeAll(async () => {
//     response = await request(app).get(ServerRoute.SEARCH).query({somethingElse: SearchArticleFragment.NO_EXIST});
//   });

//   test(`status.code === 400`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));
//   test(`0 article found`, () => expect(response.body.length).toBe(0));
// });
